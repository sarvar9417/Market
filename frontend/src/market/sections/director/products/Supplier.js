import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { checkSupplier } from './checkData';
import { Modal } from './modal/Modal';
import { t } from 'i18next';
import { CreateHeader } from './Supplier/CreateHeader';
import { CreateBody } from './Supplier/CreateBody';
import { TableHeader } from './Supplier/TableHeader';
import { TableHead } from './Supplier/TableHead';
import { Rows } from './Supplier/Rows';
import { ExcelTable } from './Supplier/ExcelTable';

export const Supplier = () => {
  const [modal, setModal] = useState(false);

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

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [search, setSearch] = useState({ name: '' });
  const [sendingsearch, setSendingSearch] = useState({ name: '' });

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [supplier, setSupplier] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setSupplier({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [currentSuppliers, setCurrentSuppliers] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);

  //====================================================================
  //====================================================================

  const [suppliersCount, setSuppliersCount] = useState(0);

  const getSuppliers = useCallback(async () => {
    try {
      const data = await request(
        '/api/supplier/getsuppliers',
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
      setCurrentSuppliers(data.suppliers);
      setSearchStorage(data.suppliers);
      setSuppliersCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currentPage, countPage, sendingsearch]);

  const getSuppliersExcel = async () => {
    try {
      const data = await request(
        '/api/supplier/getsuppliersexcel',
        'POST',
        {
          market: auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTableExcel(data);
      document.getElementById('reacthtmltoexcel').click();
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

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  const searchSupplier = (e) => {
    setSearch({
      name: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentSuppliers(searching);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/register`,
        'POST',
        { ...supplier },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('Yetkazib beruvchi yaratildi!')}`,
        description: '',
        status: 'success',
      });
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      getSuppliers();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, supplier, clearInputs, getSuppliers]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/update`,
        'PUT',
        { ...supplier },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('Yetkazib beruvchi yangilandi!')}`,
        description: '',
        status: 'success',
      });
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      getSuppliers();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, supplier, clearInputs, getSuppliers]);

  const saveHandler = () => {
    if (checkSupplier(supplier)) {
      return notify(checkSupplier(supplier));
    }
    if (supplier._id) {
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
        `/api/supplier/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("Yetkazib beruvchi o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      setModal(false);
      setSupplier({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      getSuppliers();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, remove, notify, clearInputs, getSuppliers]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setSupplier({ ...supplier, name: e.target.value });
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers, currentPage, countPage, sendingsearch]);

  //====================================================================
  //====================================================================

  return (
    <div className='overflow-x-auto'>
      {loading ? <Loader /> : ''}
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          supplier={supplier}
          inputHandler={inputHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          getSuppliersExcel={getSuppliersExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchSupplier={searchSupplier}
          setCurrentPage={setCurrentPage}
          suppliersCount={suppliersCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          setCurrentSuppliers={setCurrentSuppliers}
          currentSuppliers={currentSuppliers}
        />
        {currentSuppliers.map((supplier, index) => {
          return (
            <Rows
              index={index}
              currentPage={currentPage}
              key={index}
              c={supplier}
              setSupplier={setSupplier}
              setRemove={setRemove}
              setModal={setModal}
            />
          );
        })}
        <ExcelTable datas={tableExcel} />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("yetkazib beruvchi o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </div>
  );
};
