import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Modal } from '../components/Modal';
import { LoginPassword } from './Sellers/LoginPassword';
import { Register } from './Sellers/Register';
import { checkSeller } from './Sellers//checkData';

export const Sellers = () => {
  //====================================================================
  // Toast
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
  // AUTH
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [modal, setModal] = useState(false);

  const [seller, setSeller] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    login: '',
    password: '',
    repassword: '',
    type: 'Seller',
    market: auth.market._id,
  });

  const createSeller = useCallback(async () => {
    try {
      const data = await request(
        `/api/user/createseller`,
        'POST',
        { market: auth.market._id, ...seller },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, seller]);

  const changeHandler = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const checkData = () => {
    if (checkSeller(seller)) {
      return notify(checkSeller(seller));
    }
    setModal(true);
  };

  return (
    <div className='m-3 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Register seller={seller} changeHandler={changeHandler} />
        <LoginPassword
          seller={seller}
          changeHandler={changeHandler}
          checkData={checkData}
        />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        handler={createSeller}
        basic={'Diqqat! Yangi sotuvchi yaratishni tasdiqlaysizmi?'}
      />
    </div>
  );
};
