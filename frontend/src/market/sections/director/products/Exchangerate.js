import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { checkExchangerate } from './checkData';
import { Modal } from './modal/Modal';
import { t } from 'i18next';
import { CreateBody } from './Exchangerate/CreateBody';
import { TableHead } from './Exchangerate/TableHead';
import { Rows } from './Exchangerate/Rows';

export const Exchangerate = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      input.value = '';
    }
  }, []);
  //====================================================================
  //====================================================================

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
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [exchangerate, setExchangerate] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [exchangerates, setExchangerates] = useState([]);

  const getExchangerates = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExchangerates(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/register`,
        'POST',
        { ...exchangerate },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      notify({
        title: t('Valyuta kursi yaratildi!'),
        description: '',
        status: 'success',
      });
      getExchangerates();
      setExchangerate({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, getExchangerates, exchangerate, clearInputs]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/update`,
        'PUT',
        { ...exchangerate },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      notify({
        title: t('Valyuta kursi yangilandi!'),
        description: '',
        status: 'success',
      });
      getExchangerates();
      setExchangerate({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, getExchangerates, exchangerate, clearInputs]);

  const saveHandler = () => {
    if (checkExchangerate(exchangerate)) {
      return notify(checkExchangerate(exchangerate));
    }
    if (exchangerate._id) {
      return updateHandler();
    } else {
      return createHandler();
    }
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return saveHandler();
    }
  };

  const deleteHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      notify({
        title: t("Valyuta kursi o'chirildi!"),
        description: '',
        status: 'success',
      });
      getExchangerates();
      setModal(false);
      setExchangerate({
        market: auth.market && auth.market._id,
      });
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, remove, notify, getExchangerates, clearInputs]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setExchangerate({ ...exchangerate, exchangerate: e.target.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getExchangerates();
    }
  }, [getExchangerates, n]);
  //====================================================================
  //====================================================================

  return (
    <>
      {loading ? <Loader /> : ''}

      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[700px]'>
          <CreateBody
            exchangerate={exchangerate}
            keyPressed={keyPressed}
            inputHandler={inputHandler}
            saveHandler={saveHandler}
            clearInputs={clearInputs}
            loading={loading}
          />
          <TableHead
            currentExchangerate={exchangerates}
            setCurrentExchangerate={setExchangerates}
          />

          {exchangerates &&
            exchangerates.map((s, key) => {
              return (
                <Rows
                  s={s}
                  index={key}
                  key={key}
                  setExchangerate={setExchangerate}
                  setRemove={setRemove}
                  setModal={setModal}
                  remove={remove}
                />
              );
            })}
        </div>
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("valyuta kursini o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </>
  );
};
