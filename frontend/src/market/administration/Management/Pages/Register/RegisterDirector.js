import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttp } from '../../../../hooks/http.hook';
import { checkDirectorData } from '../../components/checkData';
import { Input } from '../../components/Input';
import { Notify } from '../../components/Notify';
import { Requests } from '../../components/Requests';
import { FileUpload } from './fileUpLoad/FileUpload';
const storageName = 'directorData';

export const RegisterDirector = () => {
  const { getBaseUrl } = Requests();
  const notify = Notify().notify;
  const [load, setLoad] = useState(false);

  const { request } = useHttp();

  const [baseUrl, setBaseUrl] = useState();

  const { market } = useParams();

  const [director, setDirector] = useState({
    type: 'Director',
    market: market,
    image: null,
  });

  const handleImage = async (e) => {
    if (director.image) {
      return notify({
        title: t('Diqqat! Surat avval yuklangan'),
        description: t(
          "Suratni qayta yuklash uchun suratni ustiga bir marotaba bosib uni o'chiring!"
        ),
        status: 'error',
      });
    }
    const files = e.target.files[0];
    const data = new FormData();
    data.append('file', files);
    setLoad(true);
    const res = await fetch('/api/upload', { method: 'POST', body: data });
    const file = await res.json();
    setDirector({ ...director, image: file.filename });
    setLoad(false);
    notify({
      status: 'success',
      description: '',
      title: t('Surat muvaffaqqiyatli yuklandi'),
    });
  };

  const removeImage = async (filename) => {
    try {
      const data = await request(`/api/upload/del`, 'POST', { filename });
      setDirector({ ...director, image: null });
      document.getElementById('default-btn').value = null;
      notify({
        status: 'success',
        description: '',
        title: data.accept,
      });
    } catch (error) {
      notify({
        status: 'error',
        description: '',
        title: error,
      });
    }
  };

  const changeHandler = (e) => {
    setDirector({ ...director, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const createHandler = async () => {
    if (checkDirectorData(director)) {
      return notify(checkDirectorData(director));
    }
    try {
      const data = await request('/api/director/register', 'POST', {
        ...director,
      });
      localStorage.setItem(
        storageName,
        JSON.stringify({
          director: data,
        })
      );
      notify({
        title: t("Tabriklaymiz! Do'kon muvaffaqqiyatli ro'yxatga olindi"),
        description: '',
        status: 'success',
      });
      history.push('/alo24administration');
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return createHandler();
    }
  };

  useEffect(() => {
    getBaseUrl(setBaseUrl);
  }, [getBaseUrl]);
  console.log(director);
  return (
    <div className='container p-3'>
      <div className='rounded overflow-hidden'>
        <div className='py-2 bg-blue-800 font-bold text-white text-center text-xl'>
          Direktorni ro'yxatga olish
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 p-3'>
          <div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>Ismi</label>
              <Input
                data={director.firstname}
                name='firstname'
                changeHandler={changeHandler}
                placeholder='Ismini kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Familiyasi
              </label>
              <Input
                data={director.lastname}
                name='lastname'
                changeHandler={changeHandler}
                placeholder='Familiyasini kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Otasining ismi
              </label>
              <Input
                data={director.fathername}
                name='fathername'
                changeHandler={changeHandler}
                placeholder='Tashkilot nomini kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Telefon raqami
              </label>
              <div className='rounded'>
                <label className='inline-block w-1/5 text-center bg-darkblue-100 py-1 border-darkblue-100 border-2 font-bold rounded-l text-sm '>
                  +998
                </label>
                <input
                  value={director.phone ? director.phone : ''}
                  placeholder='97 123456'
                  className='input inline-block w-4/5 rounded-none rounded-r'
                  type='number'
                  name='phone'
                  onChange={changeHandler}
                  onKeyUp={keyPressed}
                />
              </div>
            </div>
            <div>
              <FileUpload
                removeImage={removeImage}
                handleImage={handleImage}
                load={load}
                img={director.image}
                imgUrl={
                  baseUrl &&
                  director.image &&
                  `${baseUrl}/api/upload/file/${director.image}`
                }
              />
            </div>
          </div>
          <div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('Login')}
              </label>
              <Input
                data={director.login}
                name='login'
                changeHandler={changeHandler}
                placeholder='Loginni kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('Parol')}
              </label>
              <Input
                data={director.password}
                name='password'
                changeHandler={changeHandler}
                placeholder='Parolni kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('Parol takroriy')}
              </label>
              <Input
                data={director.confirmPassword}
                name='confirmPassword'
                changeHandler={changeHandler}
                placeholder='Parolni qayta kiriting'
                keyPressed={keyPressed}
              />
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button
            onClick={createHandler}
            className='px-6 py-2 w-full text-white bg-blue-800 hover:bg-blue-900 font-bold rounded'>
            Registratsiya
          </button>
        </div>
      </div>
    </div>
  );
};
