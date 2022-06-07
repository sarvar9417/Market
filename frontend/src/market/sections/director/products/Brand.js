import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { checkBrand } from './checkData';
import { Modal } from './modal/Modal';
import { t } from 'i18next';
import { CreateHeader } from './Brand/CreateHeader';
import { CreateBody } from './Brand/CreateBody';
import { TableHeader } from './Brand/TableHeader';
import { TableHead } from './Brand/TableHead';
import { Rows } from './Brand/Rows';
import { ExcelTable } from './Brand/ExcelTable';

export const Brand = () => {
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

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [remove, setRemove] = useState({
    market: auth.market && auth.market._id,
  });

  const [brand, setBrand] = useState({
    market: auth.market && auth.market._id,
  });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    setBrand({
      market: auth.market && auth.market._id,
    });
  }, [auth.market]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [currentBrands, setCurrentBrands] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [search, setSearch] = useState({ name: '' });
  const [sendingsearch, setSendingSearch] = useState({ name: '' });
  //====================================================================
  //====================================================================

  const [brandsCount, setBrandsCount] = useState(0);

  const getBrands = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/brand/getbrands',
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
      setSearchStorage(data.brands);
      setCurrentBrands(data.brands);
      setTableExcel(data.brands);
      setBrandsCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currentPage, countPage, sendingsearch]);

  const getBrandsExcel = async () => {
    try {
      const data = await request(
        '/api/products/brand/getbrandsexcel',
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

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/register`,
        'POST',
        { ...brand },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('brеnd yaratildi!')}`,
        description: '',
        status: 'success',
      });
      getBrands();
      setBrand({
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
  }, [request, auth, notify, brand, clearInputs, getBrands]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/update`,
        'PUT',
        { ...brand, market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('brend yangilandi!')}`,
        description: '',
        status: 'success',
      });
      getBrands();
      setBrand({
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
  }, [request, auth, notify, brand, clearInputs, getBrands]);

  const saveHandler = () => {
    if (checkBrand(brand)) {
      return notify(checkBrand(brand));
    }
    if (brand._id) {
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

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  const deleteHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/delete`,
        'DELETE',
        { ...remove, market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("nomli brend o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      getBrands();
      setModal(false);
      setBrand({
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
  }, [auth, request, remove, notify, clearInputs, getBrands]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setBrand({ ...brand, name: e.target.value });
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  const searchBrand = (e) => {
    setSearch({
      name: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentBrands(searching);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  useEffect(() => {
    getBrands();
  }, [getBrands, currentPage, countPage, sendingsearch]);

  //====================================================================
  //====================================================================

  return (
    <div className='overflow-x-auto'>
      {loading ? <Loader /> : ''}
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          brand={brand}
          inputHandler={inputHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          getBrandsExcel={getBrandsExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchBrand={searchBrand}
          setCurrentPage={setCurrentPage}
          brandsCount={brandsCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentBrands={currentBrands}
          setCurrentBrands={setCurrentBrands}
        />

        {currentBrands &&
          currentBrands.map((s, key) => {
            return (
              <Rows
                index={key}
                currentPage={currentPage}
                key={key}
                c={s}
                setBrand={setBrand}
                setRemove={setRemove}
                setModal={setModal}
              />
            );
          })}
      </div>

      <ExcelTable datas={tableExcel} />

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("Brendni o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </div>
  );
};
