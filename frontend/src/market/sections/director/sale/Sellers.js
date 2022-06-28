import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Modal } from '../components/Modal';
import { LoginPassword } from './Sellers/LoginPassword';
import { Register } from './Sellers/Register';
import { checkSeller, checkSellerId } from './Sellers/checkData';
import { TableHead } from './Sellers/TableHead';
import { Rows } from './Sellers/Rows';
import { t } from 'i18next';

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
    confirmPassword: '',
    type: 'Seller',
    market: auth.market._id,
  });

  const [sellers, setSellers] = useState([]);

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
      notify({
        title: t('Sotuvchi Muvaffaqqiyatli yaratildi.'),
        description: '',
        status: 'success',
      });
      setSellers(data);
      setModal(false);
      setSeller({
        firstname: '',
        lastname: '',
        phone: '',
        login: '',
        password: '',
        confirmPassword: '',
        type: 'Seller',
        market: auth.market._id,
      });
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, seller]);

  const getSellers = useCallback(async () => {
    try {
      const data = await request(
        `/api/user/getsellers`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSellers(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeHandler = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const checkData = () => {
    if (seller._id) {
      if (checkSellerId(seller)) {
        return notify(checkSellerId(seller));
      }
    } else {
      if (checkSeller(seller)) {
        return notify(checkSeller(seller));
      }
    }
    setModal(true);
  };

  useEffect(() => {
    getSellers();
  }, [getSellers]);

  return (
    <div className='m-3 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3'>
        <Register seller={seller} changeHandler={changeHandler} />
        <LoginPassword
          seller={seller}
          changeHandler={changeHandler}
          checkData={checkData}
        />
      </div>
      <div>
        <TableHead />
        {sellers.map((s, index) => {
          return (
            <Rows index={index} key={index} seller={s} setSeller={setSeller} />
          );
        })}
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        handler={createSeller}
        basic={t('Diqqat! Yangi sotuvchi yaratishni tasdiqlaysizmi?')}
      />
    </div>
  );
};
