import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { checkUnit } from './checkData';
import { Modal } from './modal/Modal';
import { t } from 'i18next';
import { CreateHeader } from './Unit/CreateHeader';
import { CreateBody } from './Unit/CreateBody';
import { TableHead } from './Unit/TableHead';
import { Rows } from './Unit/Rows';

export const Unit = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
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

  const [unit, setUnit] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setUnit({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [units, setUnits] = useState([]);

  const getUnits = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/unit/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setUnits(data);
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
        `/api/products/unit/register`,
        'POST',
        { ...unit },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("o'lchov birliki yaratildi!")}`,
        description: '',
        status: 'success',
      });
      setUnit({
        market: auth.market && auth.market._id,
      });
      getUnits();
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, unit, clearInputs, getUnits]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/unit/update`,
        'PUT',
        { ...unit },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("o'lchov birliki yangilandi!")}`,
        description: '',
        status: 'success',
      });
      setUnit({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      getUnits();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, unit, clearInputs, getUnits]);

  const saveHandler = () => {
    if (checkUnit(unit)) {
      return notify(checkUnit(unit));
    }
    if (unit._id) {
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
        `/api/products/unit/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("o'lchov birligi o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      setModal(false);
      getUnits();
      setUnit({
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
  }, [auth, request, remove, notify, clearInputs, getUnits]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setUnit({ ...unit, name: e.target.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getUnits();
    }
  }, [getUnits, n]);
  //====================================================================
  //====================================================================

  return (
    <div className='overflow-x-auto'>
      {loading ? <Loader /> : ''}
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          unit={unit}
          keyPressed={keyPressed}
          inputHandler={inputHandler}
          saveHandler={saveHandler}
          clearInputs={clearInputs}
        />
        <br />
        <TableHead currentUnits={units} setCurrentUnits={setUnits} />
        {units.map((unit, index) => {
          return (
            <Rows
              setUnit={setUnit}
              index={index}
              key={index}
              unit={unit}
              setModal={setModal}
              setRemove={setRemove}
            />
          );
        })}
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("o'lchov birlikini o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </div>
  );
};
