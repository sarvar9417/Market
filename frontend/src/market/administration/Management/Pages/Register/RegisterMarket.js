import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../../../hooks/http.hook';
import { checkMarketData } from '../../components/checkData';
import { Input } from '../../components/Input';
import { Notify } from '../../components/Notify';
import { Requests } from '../../components/Requests';
import { FileUpload } from './fileUpLoad/FileUpload';
const storageName = 'marketData';

export const RegisterMarket = () => {
  const { getBaseUrl } = Requests();
  const notify = Notify().notify;
  const [load, setLoad] = useState(false);

  const { request } = useHttp();

  const [baseUrl, setBaseUrl] = useState();

  const [market, setMarket] = useState({
    image: null,
  });

  const handleImage = async (e) => {
    if (market.image) {
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
    setMarket({ ...market, image: file.filename });
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
      setMarket({ ...market, image: null });
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
    setMarket({ ...market, [e.target.name]: e.target.value });
  };

  const history = useHistory();
  const createHandler = async () => {
    if (checkMarketData(market)) {
      return notify(checkMarketData(market));
    }
    try {
      const data = await request('/api/market/register', 'POST', {
        ...market,
      });
      localStorage.setItem(
        storageName,
        JSON.stringify({
          market: data,
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
  return (
    <div className='container p-3'>
      <div className='rounded overflow-hidden'>
        <div className='py-2 bg-blue-800 font-bold text-white text-center text-xl'>
          Do'konni ro'yxatga olish
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 p-3'>
          <div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Do'kon nomi
              </label>
              <Input
                data={market.name}
                name='name'
                changeHandler={changeHandler}
                placeholder="Do'kon nomini kiriting"
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Tashkilot nomi
              </label>
              <Input
                data={market.organitionName}
                name='organitionName'
                changeHandler={changeHandler}
                placeholder='Tashkilot nomini kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Manzil
              </label>
              <Input
                data={market.address}
                name='address'
                changeHandler={changeHandler}
                placeholder='Tashkilot nomini kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t("Mo'ljal")}
              </label>
              <Input
                data={market.orientation}
                name='orientation'
                changeHandler={changeHandler}
                placeholder="Mo'ljalni kiriting"
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Telefon raqam
              </label>
              <div className='rounded'>
                <label className='inline-block w-1/5 text-center bg-darkblue-100 py-1 border-darkblue-100 border-2 font-bold rounded-l text-sm '>
                  +998
                </label>
                <input
                  value={market.phone1 ? market.phone1 : ''}
                  placeholder='97 123456'
                  className='input inline-block w-4/5 rounded-none rounded-r'
                  type='number'
                  name='phone1'
                  onChange={changeHandler}
                  onKeyUp={keyPressed}
                />
              </div>
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Telefon raqam 2
              </label>
              <div className='rounded'>
                <label className='inline-block w-1/5 text-center bg-darkblue-100 py-1 border-darkblue-100 border-2 font-bold rounded-l text-sm '>
                  +998
                </label>
                <input
                  value={market.phone2 ? market.phone2 : ''}
                  placeholder='97 123456'
                  className='input inline-block w-4/5 rounded-none rounded-r'
                  type='number'
                  name='phone2'
                  onChange={changeHandler}
                  onKeyUp={keyPressed}
                />
              </div>
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                Telefon raqam 3
              </label>
              <div className='rounded'>
                <label className='inline-block w-1/5 text-center bg-darkblue-100 py-1 border-darkblue-100 border-2 font-bold rounded-l text-sm '>
                  +998
                </label>
                <input
                  value={market.phone3 ? market.phone3 : ''}
                  placeholder='97 123456'
                  className='input inline-block w-4/5 rounded-none rounded-r'
                  type='number'
                  name='phone3'
                  onChange={changeHandler}
                  onKeyUp={keyPressed}
                />
              </div>
            </div>
          </div>
          <div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('Bank nomi')}
              </label>
              <Input
                data={market.bank}
                name='bank'
                changeHandler={changeHandler}
                placeholder="Mo'ljalni kiriting"
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('MFO')}
              </label>
              <Input
                data={market.mfo}
                type='number'
                name='mfo'
                changeHandler={changeHandler}
                placeholder='MFO ni kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('Hisob raqam')}
              </label>
              <Input
                data={market.bankNumber}
                type='number'
                name='bankNumber'
                changeHandler={changeHandler}
                placeholder='Hisobraqamni kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div className='pr-5 mb-3'>
              <label className='uppercase font-bold text-blue-900'>
                {t('INN')}
              </label>
              <Input
                data={market.inn}
                type='number'
                name='inn'
                changeHandler={changeHandler}
                placeholder='INN ni kiriting'
                keyPressed={keyPressed}
              />
            </div>
            <div>
              <FileUpload
                removeImage={removeImage}
                handleImage={handleImage}
                load={load}
                img={market.image}
                imgUrl={
                  baseUrl &&
                  market.image &&
                  `${baseUrl}/api/upload/file/${market.image}`
                }
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
