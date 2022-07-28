import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { Loader } from '../../../loader/Loader';
import { useToast } from '@chakra-ui/react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { TableProduct } from './ProductCategory/TableProduct';
import { t } from 'i18next';
import { ExcelTable } from './ProductCategory/ExcelTable';
import { Loader } from '../../../loader/Loader';
import { Currency } from '../components/Currency';
import { useParams } from 'react-router-dom';

export const ProductCategory = () => {
  const categoryId = useParams().categoryId;
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  const selectRef = {
    unit: useRef(),
    category: useRef(),
  };

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

  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [product, setProduct] = useState({
    market: auth.market && auth.market._id,
    code: '',
    name: '',
    total: 0,
    category: '',
    incomingprice: 0,
    sellingprice: 0,
    incomingpriceuzs: 0,
    sellingpriceuzs: 0,
  });

  // const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
    category: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });

  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/productcategory`,
        'POST',
        {
          market: auth.market._id,
          categoryId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentProducts(data);
      setSearchStorage(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, setCurrentProducts, categoryId]);

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

  // SEARCH
  const searchProducts = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.productdata.code.toLowerCase().includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.productdata.name.toLowerCase().includes(e.target.value)
      );
      setCurrentProducts(searching);
    }

    if (e.target.name === 'category') {
      const searching = searchStorage.filter((item) =>
        item.category.code.toLowerCase().includes(e.target.value)
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

  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(products.slice(0, e.target.value));
    },
    [products]
  );

  const [currency, setCurrency] = useState('UZS');
  // const [autoconvertation, setAutocConversation] = useState(true);

  const changeCurrency = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/currencyupdate`,
        'PUT',
        {
          market: auth.market._id,
          currency: currency === 'UZS' ? 'USD' : 'UZS',
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      setCurrency(currency === 'UZS' ? 'USD' : 'UZS');
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currency]);

  const getCurrency = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/currencyget`,
        'POST',
        {
          market: auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrency(data.currency);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);

  //====================================================================
  //UseEffects
  useEffect(() => {
    getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch]);

  useEffect(() => {
    getCurrency();
  }, [getCurrency]);
  console.log(currentProducts);
  return (
    <>
      {loading ? <Loader /> : ''}
      <div className='m-3 flex justify-between font-bold'>
        <div>
          {t('Jami kelish narxi')}:{' '}
          {currency === 'UZS'
            ? currentProducts
                .reduce(
                  (summ, product) =>
                    summ + product.total * product.price.incomingpriceuzs,
                  0
                )
                .toLocaleString('ru-RU')
            : currentProducts
                .reduce(
                  (summ, product) =>
                    summ + product.total * product.price.incomingprice,
                  0
                )
                .toLocaleString('ru-RU')}{' '}
          {currency}
        </div>
        <div>
          {t('Jami sotish narxi')}:{' '}
          {currency === 'UZS'
            ? currentProducts
                .reduce(
                  (summ, product) =>
                    summ + product.total * product.price.sellingpriceuzs,
                  0
                )
                .toLocaleString('ru-RU')
            : currentProducts
                .reduce(
                  (summ, product) =>
                    summ + product.total * product.price.sellingprice,
                  0
                )
                .toLocaleString('ru-RU')}{' '}
          {currency}
        </div>
        <div className='font-bold text-right'>
          Asosiy valyuta turi:{' '}
          <Currency
            value={currency === 'UZS' ? true : false}
            onToggle={changeCurrency}
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[800px]'>
          <TableProduct
            currency={currency}
            search={search}
            getProductExcel={getProductExcel}
            keyPress={searchKeypress}
            product={product}
            changeHandler={searchProducts}
            products={products}
            setProducts={setProducts}
            setProduct={setProduct}
            setCurrentPage={setCurrentPage}
            countPage={countPage}
            setCountPage={setCountPage}
            currentProducts={currentProducts}
            setCurrentProducts={setCurrentProducts}
            currentPage={currentPage}
            setPageSize={setPageSize}
            loading={loading}
            selectRef={selectRef}
            // productsCount={productsCount}
          />
        </div>
      </div>

      <ExcelTable products={excelDatas} />
    </>
  );
};
