import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { checkUserData } from './checkData';
import Translate from './../../translation/Translate';
import { useTranslation } from 'react-i18next';
import PasswordInput from './PasswordInput';
import { InputGroup, useToast, Input } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

export const Login = () => {
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

  const history = useHistory();
  const [hour, setHour] = useState(new Date().toLocaleTimeString());

  const weekDays = ['Yak', 'Du', 'Se', 'Chor', 'Paysh', 'Juma', 'Shanba'];
  const monthNames = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ];

  setTimeout(() => {
    setHour(new Date().toLocaleTimeString());
  }, 1000);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [user, setUser] = useState({
    login: null,
    password: null,
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    if (checkUserData(user)) {
      return notify(checkUserData(user));
    }
    try {
      const data = await request(`/api/user/login`, 'POST', { ...user });
      auth.login(data.token, data.userId, data.user, data.market);
      notify({
        title: t(`Xush kelibsiz!`),
        description: t('Kirish muvaffaqqiyatli amalga oshirildi'),
        status: 'success',
      });
      history.push('/alo24');
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
      return loginHandler();
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const { t } = useTranslation();
  //====================================================================
  //====================================================================

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div
        className='h-screen overflow-y-auto'
        style={{ backgroundColor: '#0A3D3F' }}>
        <div className='wrapper h-full overflow-y-auto'>
          <div className='w-full'>
            <Translate />
          </div>
          <div className='h-full flex flex-col items-center justify-around lg:flex-row lg:justify-center px-2 py-2 relative'>
            <div
              className='w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] mb-4 lg:mb-0 self-center flex flex-col justify-center items-center border-solid border-[15px] rounded-full '
              style={{
                borderColor: '#17E7FE',
                boxShadow: '0px 0px 30px #17E7FE',
              }}>
              <div className='max-w-[250px] max-h-[250px] text-center '>
                <div className='text-white mb-4' style={{ fontSize: '2rem' }}>
                  {hour}
                </div>
                <div className='mb-3'>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type='text'
                      placeholder={t('Loginni kiriting')}
                      size='sm'
                      style={{
                        borderColor: '#eee',
                        boxShadow: 'none',
                      }}
                      name='login'
                      onChange={changeHandler}
                      onKeyUp={keyPressed}
                      color='white'
                    />
                  </InputGroup>
                </div>
                <div className='mb-3'>
                  <PasswordInput
                    keyPressed={keyPressed}
                    name={'password'}
                    changeHandler={changeHandler}
                  />
                </div>
                <div className='text-white'>
                  <button
                    onClick={loginHandler}
                    className='border-solid border-white border py-1 px-4'>
                    {t('Kirish')}
                  </button>
                </div>
              </div>
            </div>
            <div className='max-w-[300px] lg:absolute lg:right-0 lg:bottom-0 p-2'>
              <div className='w-full flex justify-center items-center gap-4 mb-4'>
                <div
                  style={{
                    width: '110px',
                    height: '110px',
                    backgroundColor: '#17E7FE',
                    borderRadius: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotate(15deg)',
                  }}>
                  <div
                    style={{
                      width: '65px',
                      height: '65px',
                      backgroundColor: '#0A3D3F',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: 'rotate(-15deg)',
                    }}>
                    <FontAwesomeIcon
                      icon={faPhone}
                      color='#17E7FE'
                      fontSize='24px'
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#17E7FE',
                    lineHeight: '100%',
                  }}>
                  ALO
                  <br />
                  24
                </p>
              </div>
              <div
                className='text-white font-bold'
                style={{ fontSize: '1.25rem' }}>
                {t(weekDays[new Date().getDay()])},<span> </span>
                {new Date().getDate()}
                <span> </span>
                {t(monthNames[new Date().getMonth()])},<span> </span>
                {new Date().getFullYear()}
                <span> {t('yil')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
