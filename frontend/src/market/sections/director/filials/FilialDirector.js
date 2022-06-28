import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
} from '@chakra-ui/react';
import PasswordInput from '../../../loginAndRegister/PasswordInput';
import { FileUpload } from '../../../loginAndRegister/fileUpLoad/FileUpload';
import { useHttp } from '../../../hooks/http.hook';
import { useToast } from '@chakra-ui/react';
import { checkDirectorData } from '../../../loginAndRegister/checkData';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../../../loader/Loader';
import { t } from 'i18next';
import { AuthContext } from '../../../context/AuthContext';

export const FilialDirector = () => {
  //====================================================================
  //====================================================================
  const toast = useToast();

  const notify = useCallback(
    (data) => {
      toast({
        title: data.title && data.title,
        description: data.description && data.description,
        status: data.status && data.status,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [toast]
  );
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [load, setLoad] = useState(false);

  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const market = JSON.parse(localStorage.getItem('marketData'));

  const [director, setDirector] = useState({
    type: 'Director',
    market: market && market.market._id,
    image: null,
  });

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [baseUrl, setBaseUrl] = useState();

  const getBaseUrl = useCallback(async () => {
    try {
      const data = await request('/api/baseurl', 'GET', null);
      setBaseUrl(data.baseUrl);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const styled = {
    borderColor: '#eee',
    boxShadow: 'none',
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
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
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const changeHandler = (e) => {
    setDirector({ ...director, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const createHandler = async () => {
    if (checkDirectorData(director)) {
      return notify(checkDirectorData(director));
    }
    try {
      const data = await request(
        '/api/branch/registerdirector',
        'POST',
        {
          ...director,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${("Tabriklaymiz!")} ${data.firstname + ' ' + data.lastname} ${t(
          "Siz uchun direktor bo'limi ham muvaffaqqiyatli yaratildi."
        )}`,
        description: '',
        status: 'success',
      });
      history.push('/alo24/branches');
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return createHandler();
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  useEffect(() => {
    getBaseUrl();
  }, [getBaseUrl]);
  //====================================================================
  //====================================================================

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='page-content container-fluid'>
      <div className='row mt-5'>
        <div className='col-xl-7 mx-auto'>
          <div className='card ' style={{ borderTop: '4px solid #38B2AC ' }}>
            <div className='card-body p-5'>
              <div
                className='card-title d-flex align-items-center'
                style={{ fontSize: '20pt', color: '#38B2AC' }}>
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <h5 className='mb-0 fs-5 ml-2' style={{ fontWeight: '600' }}>
                  {t('Direktor')}
                </h5>
              </div>
              <hr />
              <form className='row g-3'>
                <div className='col-md-6'>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Ism')}
                      </FormLabel>
                      <Input
                        onKeyUp={keyPressed}
                        className='is-valid'
                        placeholder={t('Ismni kiriting')}
                        size='sm'
                        style={styled}
                        onChange={changeHandler}
                        name='firstname'
                      />
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Familiya')}
                      </FormLabel>
                      <Input
                        onKeyUp={keyPressed}
                        placeholder={t('Familiya kiriting')}
                        size='sm'
                        style={{ borderColor: '#eee', boxShadow: 'none' }}
                        name='lastname'
                        onChange={changeHandler}
                      />
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl>
                      <FormLabel
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Otasining ismi')}
                      </FormLabel>
                      <Input
                        onKeyUp={keyPressed}
                        placeholder={t('Otasini ismini kiriting')}
                        size='sm'
                        style={{ borderColor: '#eee', boxShadow: 'none' }}
                        name='fathername'
                        onChange={changeHandler}
                      />
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Telefon')}
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon
                          children='+998'
                          style={{ height: '32px' }}
                        />
                        <Input
                          onKeyUp={keyPressed}
                          placeholder={t('Telefon nomerni kiriting')}
                          size='sm'
                          type='number'
                          style={{ borderColor: '#eee', boxShadow: 'none' }}
                          name='phone'
                          onChange={changeHandler}
                        />
                      </InputGroup>
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor='first-name'
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Login')}
                      </FormLabel>
                      <Input
                        placeholder={t('Login kiriting')}
                        size='sm'
                        type='text'
                        style={{ borderColor: '#eee', boxShadow: 'none' }}
                        name='login'
                        onChange={changeHandler}
                      />
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor='first-name'
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Parol')}
                      </FormLabel>
                      <PasswordInput
                        keyPressed={keyPressed}
                        name={'password'}
                        changeHandler={changeHandler}
                      />
                    </FormControl>
                  </div>
                  <div className='col-md-12'>
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor='first-name'
                        style={{ color: '#38B2AC', marginTop: '1rem' }}>
                        {t('Parol')}
                      </FormLabel>
                      <PasswordInput
                        keyPressed={keyPressed}
                        name={'confirmPassword'}
                        changeHandler={changeHandler}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className='col-md-6'>
                  <FormControl isRequired>
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
                  </FormControl>
                </div>

                <div className='col-md-6 text-center mt-2'>
                  {loading || load ? (
                    <Button
                      isLoading
                      colorScheme='teal'
                      variant='solid'></Button>
                  ) : (
                    <Button
                      colorScheme='teal'
                      variant='solid'
                      onClick={createHandler}>
                      {t('Registratsiya')}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
