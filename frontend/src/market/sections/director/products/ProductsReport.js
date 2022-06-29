import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { ExcelTable } from './ProductsReport/ExcelTable';
import { TableHeader } from './ProductsReport/TableHeader';
import { TableHead } from './ProductsReport/TableHead';
import { TableRow } from './ProductsReport/TableRow';

export const ProductsReport = () => {
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  // Notify
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

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  //===================================================================
  //====================================================================
  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getproducts`,
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
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProducts(data.products);
      setProductsCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    auth,
    notify,
    setCurrentProducts,
    setSearchStorage,
    currentPage,
    countPage,
    sendingsearch,
  ]);

  const [excelDatas, setExcelDatas] = useState([]);

  const getProductExcel = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/product/getexceldata',
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

  //====================================================================
  //====================================================================
  // SEARCH
  const searchProducts = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.productdata.code.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.productdata.name.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch({ ...search });
    }
  };
  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(products.slice(0, e.target.value));
    },
    [products]
  );

  //====================================================================
  //UseEffects
  useEffect(() => {
    getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch]);

  return (
    <>
      {/* {loading ? <Loader /> : ''} */}
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[800px]'>
          <TableHeader
            search={search}
            currentPage={currentPage}
            setPageSize={setPageSize}
            changeHandler={searchProducts}
            keyPress={searchKeypress}
            countPage={countPage}
            setCurrentPage={setCurrentPage}
            productsCount={productsCount}
            getProductExcel={getProductExcel}
          />
          <TableHead
            currentProducts={currentProducts}
            setCurrentProducts={setCurrentProducts}
          />
          {currentProducts &&
            currentProducts.map((p, index) => {
              return (
                <TableRow
                  countPage={countPage}
                  p={p}
                  index={index}
                  currentPage={currentPage}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <ExcelTable products={excelDatas} />
    </>
  );
};
