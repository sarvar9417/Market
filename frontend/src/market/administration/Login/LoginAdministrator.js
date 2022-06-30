import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import img from './img/draw2.webp';

export const LoginAdministrator = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory();
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

  const [loginPassword, setLoginPassword] = useState({
    login: '',
    password: '',
  });

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return checkData();
    }
  };

  const checkData = () => {
    if (loginPassword.login === '') {
      return notify({
        title: 'Diqqat! Login kiritilmagan.',
        status: 'error',
      });
    }
    if (loginPassword.password === '') {
      return notify({
        title: 'Diqqat! Parol kiritilmagan.',
        status: 'error',
      });
    }

    if (loginPassword.password.length < 8) {
      return notify({
        title: "Diqqat! Parol kamida 8 belgidan iborat bo'lishi kerak.",
        status: 'error',
      });
    }
    return loginHandler();
  };

  const changeHandler = (e) => {
    setLoginPassword({ ...loginPassword, [e.target.name]: e.target.value });
  };

  const loginHandler = useCallback(async () => {
    try {
      const data = await request('/api/administrator/login', 'POST', {
        ...loginPassword,
      });
      auth.loginAdministrator(data.token, data.administrator);
      notify({
        title: "Administrator bo'limiga xush kelibsiz",
        status: 'success',
      });
      history.push('/alo24administration');
    } catch (error) {
      notify({
        title: error,
        status: 'error',
      });
    }
  }, [request, loginPassword, notify, auth, history,]);

  return (
    <div className='container'>
      <section className='h-screen'>
        <div className='px-6 h-full text-gray-800'>
          <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
            <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
              <img src={img} className='w-full' alt='Logotip' />
            </div>
            <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
              <form>
                <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                  <p className='text-center font-semibold mx-4 mb-0'>Kirish</p>
                </div>
                <div className='mb-6'>
                  <input
                    onKeyUp={keyPressed}
                    onChange={changeHandler}
                    type='text'
                    name='login'
                    className='form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput2'
                    placeholder='Login'
                  />
                </div>
                {/* Password input */}
                <div className='mb-6'>
                  <input
                    onKeyUp={keyPressed}
                    onChange={changeHandler}
                    type='password'
                    name='password'
                    className='form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput2'
                    placeholder='Password'
                  />
                </div>
                <div className='text-center lg:text-left'>
                  <button
                    onClick={checkData}
                    type='button'
                    className='inline-block px-4 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                    Kirish
                  </button>
                  <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                    Agar administrator yaratilmagan bo'lsa ... <br />
                    <Link
                      to='/administrationregister'
                      className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>
                      Registratsiya qismiga o'tish
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};
