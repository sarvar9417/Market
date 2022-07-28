import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { checkCategory } from './checkData';
import { Modal } from './modal/Modal';
import { t } from 'i18next';
import { CreateHeader } from './Category/CreateHeader';
import { CreateBody } from './Category/CreateBody';
import { TableHeader } from './Category/TableHeader';
import { TableHead } from './Category/TableHead';
import { Rows } from './Category/Rows';
import { ExcelTable } from './Category/ExcelTable';
export const Category = () => {
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [remove, setRemove] = useState();

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
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [categoryCount, setCategoryCount] = useState(0);
  const [search, setSearch] = useState({ code: '', name: '' });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [category, setCategory] = useState({
    market: auth.market && auth.market._id,
    name: '',
    code: '',
  });

  const changeHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      input.value = '';
    }
    setCategory({
      market: auth.market && auth.market._id,
    });
  }, [auth]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [currentCategories, setCurrentCategories] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getCategory = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/category/getcategories',
        'POST',
        {
          market: auth.market && auth.market._id,
          countPage,
          currentPage,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentCategories(data.categories);
      setSearchStorage(data.categories);
      setCategoryCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, countPage, currentPage, sendingsearch]);

  const [excelDatas, setExcelDatas] = useState([]);

  const getCategoryExcel = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/category/getcategoriesexcel',
        'POST',
        {
          market: auth.market && auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExcelDatas(data);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, sendingsearch]);

  //====================================================================
  //====================================================================

  const searchKeypress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setCurrentPage(0);
        setSendingSearch(search);
      }
    },
    [search]
  );

  const searchCategory = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });

    const searching = searchStorage.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(e.target.value.toLowerCase())) ||
        String(item.code).includes(e.target.value)
    );
    setCurrentCategories(searching);
  };

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/register`,
        'POST',
        { ...category, code: `${category.code}` },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('kategoriyasi yaratildi!')}`,
        description: '',
        status: 'success',
      });
      getCategory();
      setCategory({
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
  }, [request, auth, notify, category, clearInputs, getCategory]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/update`,
        'PUT',
        { ...category, code: `${category.code}` },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('kategoriyasi yangilandi!')}`,
        description: '',
        status: 'success',
      });
      getCategory();
      setCategory({
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
  }, [request, auth, notify, category, clearInputs, getCategory]);

  const saveHandler = () => {
    if (checkCategory(category)) {
      return notify(checkCategory(category));
    }
    if (category._id) {
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
        `/api/products/category/delete`,
        'DELETE',
        { ...remove },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("kategoriyasi o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      getCategory();
      setCategory({
        market: auth.market && auth.market._id,
      });
      clearInputs();
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, remove, notify, clearInputs, getCategory]);

  useEffect(() => {
    getCategory();
  }, [currentPage, countPage, getCategory, sendingsearch]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[700px]'>
        <CreateHeader />
        <CreateBody
          category={category}
          changeHandler={changeHandler}
          saveHandler={saveHandler}
          loading={loading}
          keyPressed={keyPressed}
          clearInputs={clearInputs}
        />
        <br />
        <TableHeader
          getCategoryExcel={getCategoryExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchCategory={searchCategory}
          setCurrentPage={setCurrentPage}
          totalDatas={categoryCount}
          countPage={countPage}
          search={search}
          nameKeyPressed={searchKeypress}
          codeKeyPressed={searchKeypress}
        />
        <TableHead
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
        {currentCategories &&
          currentCategories.map((c, key) => {
            return (
              <Rows
                loading={loading}
                index={key}
                currentPage={currentPage}
                key={key}
                c={c}
                category={category}
                setCategory={setCategory}
                setRemove={setRemove}
                setModal={setModal}
              />
            );
          })}
      </div>
      <ExcelTable datas={excelDatas} />

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.code}
        text={t("kategoriyasini o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />
    </div>
  );
};
