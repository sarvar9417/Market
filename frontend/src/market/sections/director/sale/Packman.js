import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Modal } from '../products/modal/Modal';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { checkPackman } from './checkData';
import { t } from 'i18next';
import { CreatePackman } from './PackmanComponents/CreatePackman';
import { PackmanTable } from './PackmanComponents/PackmanTable';

export const Packman = () => {
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

  const { loading, request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================
  //====================================================================

  const [packman, setPackman] = useState({
    market: auth.market && auth.market._id,
  });

  //====================================================================
  //====================================================================

  const changeHandler = (e) => {
    setPackman({ ...packman, name: e.target.value });
  };

  //====================================================================

  const clearInputs = useCallback(() => {
    setPackman({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      return saveHandler();
    }
  };

  //====================================================================

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  //====================================================================

  const [search, setSearch] = useState({
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({});

  const searchPackman = (e) => {
    setSearch({ name: e.target.value });

    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCurrentPackmans(searching);
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const saveHandler = () => {
    if (checkPackman(packman)) {
      return notify(checkPackman(packman));
    }

    if (packman._id) {
      return updatePackman();
    } else {
      return createPackman();
    }
  };

  //====================================================================
  //====================================================================

  const [currentPackmans, setCurrentPackmans] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [packmansCount, setPackmansCount] = useState(0);

  const getPackmans = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/packman/getpackmans',
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(data);
      setSearchStorage(data.packmans);
      setCurrentPackmans(data.packmans);
      setPackmansCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currentPage, countPage, sendingsearch]);

  //====================================================================
  //====================================================================

  const createPackman = async () => {
    try {
      const data = await request(
        '/api/sales/packman/register',
        'POST',
        { ...packman },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      getPackmans();
      clearInputs();
      setPackman({
        market: auth.market && auth.market._id,
      });
      notify({
        title: `${data.name} ${t('degan yetkazuvchi yaratildi!')}`,
        description: '',
        status: 'success',
      });
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

  const updatePackman = async () => {
    try {
      const data = await request(
        '/api/sales/packman/update',
        'PUT',
        { ...packman },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      clearInputs();
      setPackman({
        market: auth.market && auth.market._id,
      });
      getPackmans();
      notify({
        title: `${data.name} ${t('degan yetkazuvchi yangilandi!')}`,
        description: '',
        status: 'success',
      });
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

  const deletePackman = async () => {
    try {
      const data = await request(
        '/api/sales/packman/delete',
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setRemove({
        market: auth.market && auth.market._id,
      });
      getPackmans();
      notify({
        title: `${data.name} ${t("degan yetkazuvchi o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      setModal(false);
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

  useEffect(() => {
    getPackmans();
  }, [currentPage, getPackmans, countPage, sendingsearch]);

  // const [n, setN] = useState(false);
  // useEffect(() => {
  //   if (!n) {
  //     getPackmans();
  //     setN(true);
  //   }
  // }, [getPackmans, n]);

  //====================================================================
  //===================== ===============================================

  //====================================================================
  //====================================================================

  return (
    <>
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[700px]'>
          <CreatePackman
            packman={packman}
            changeHandler={changeHandler}
            keyPressed={keyPressed}
            saveHandler={saveHandler}
            clearInputs={clearInputs}
            loading={loading}
          />
          <PackmanTable
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchPackman={searchPackman}
            countPage={countPage}
            totalDatas={packmansCount}
            currentPackmans={currentPackmans}
            setCurrentPackmans={setCurrentPackmans}
            setModal={setModal}
            setPackman={setPackman}
            setRemove={setRemove}
            searchKeypress={searchKeypress}
          />
        </div>
      </div>
      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("yetkazuvchini o'chirishni tasdiqlaysizmi?")}
        handler={deletePackman}
      />
    </>
  );
};
