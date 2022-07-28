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
import { checkProduct, checkProducts } from './checkData';
import { Modal } from './modal/Modal';
import { TableProduct } from './Product/TableProduct';
import { ExcelCols } from './Product/excelTable/ExcelCols';
import { CreateProduct } from './Product/CreateProduct';
import { t } from 'i18next';
import { ExcelTable } from './Product/ExcelTable';
import { Loader } from '../../../loader/Loader';
import { Currency } from '../components/Currency';

export const Product = () => {
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [remove, setRemove] = useState();

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

  const sections = [
    { name: t('Mahsulot kategoriyasi'), value: 'category' },
    { name: t('Mahsulot kodi'), value: 'code' },
    { name: t('Mahsulot nomi'), value: 'name' },
    { name: t("O'lchov birligi"), value: 'unit' },
    { name: t('Soni'), value: 'total' },
    { name: t('Kelish narxi USD'), value: 'incomingprice' },
    { name: t('Kelish narxi UZS'), value: 'incomingpriceuzs' },
    { name: t('Sotish narxi USD'), value: 'sellingprice' },
    { name: t('Sotish narxi UZS'), value: 'sellingpriceuzs' },
  ];

  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      if (input.datatype === 'input') {
        input.value = '12';
      }
    }
    selectRef.unit.current.selectOption({
      label: t("O'lchov birligi"),
      value: 'delete',
    });
    selectRef.category.current.selectOption({
      label: t('Kategoriya'),
      value: 'delete',
    });
    setProduct({
      market: auth.market && auth.market._id,
      total: 0,
      code: '',
      name: '',
      category: '',
      incomingprice: 0,
      sellingprice: 0,
      incomingpriceuzs: 0,
      sellingpriceuzs: 0,
    });
  }, [auth, selectRef.unit, selectRef.category]);

  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
    category: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });

  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([
    { label: 'Kategoriyalar', value: 'delete' },
  ]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [changeImports, setChangeImports] = useState([]);
  const [imports, setImports] = useState([]);

  const getCategory = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/category/getall',
        'POST',
        {
          market: auth.market && auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [{ label: 'Kategoriyalar', value: 'delete' }];
      data.map((d) => {
        return s.push({
          label: d.code + (d.name ? '-' + d.name : ''),
          value: d,
        });
      });
      setCategorys(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);

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

  // Exchangerate
  const [exchangerate, setExchangerate] = useState({ exchangerate: 0 });

  const getExchangerate = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/get`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExchangerate(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const [units, setUnits] = useState([]);

  const getUnits = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/unit/getall',
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: t("O'lchov birligi"),
          value: 'delete',
        },
      ];
      data.map((unit) => {
        return s.push({
          label: unit.name,
          value: unit._id,
        });
      });
      setUnits(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify, auth]);

  const changeUnit = (e) => {
    if (e.value === 'delete') {
      setProduct({ ...product, unit: null });
    }
    setProduct({ ...product, unit: e.value });
  };

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/register`,
        'POST',
        {
          product: { ...product },
          currentPage,
          countPage,
          market: auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${product.name} ${t('mahsuloti yaratildi!')}`,
        description: '',
        status: 'success',
      });
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProductsCount(data.count);
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    auth,
    request,
    product,
    notify,
    clearInputs,
    countPage,
    currentPage,
    sendingsearch,
  ]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/update`,
        'PUT',
        {
          product: { ...product },
          currentPage,
          countPage,
          market: auth.market._id,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      notify({
        title: `${product.name} ${t('mahsuloti yangilandi!')}`,
        description: '',
        status: 'success',
      });
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProductsCount(data.count);
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    auth,
    request,
    product,
    notify,
    clearInputs,
    currentPage,
    countPage,
    sendingsearch,
  ]);

  const saveHandler = () => {
    if (checkProduct(product, t)) {
      return notify(checkProduct(product, t));
    }
    if (product._id) {
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
        `/api/products/product/delete`,
        'DELETE',
        {
          ...remove,
          market: auth.market && auth.market._id,
          search: sendingsearch,
          currentPage,
          countPage,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${t("Mahsulot o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProductsCount(data.count);
      clearInputs();
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    auth,
    request,
    remove,
    notify,
    clearInputs,
    sendingsearch,
    countPage,
    currentPage,
  ]);

  const inputHandler = (e) => {
    if (e.target.name === 'incomingprice' || e.target.name === 'sellingprice') {
      currency === 'UZS' &&
        autoconvertation &&
        setProduct({
          ...product,
          [e.target.name + 'uzs']:
            Math.round(parseFloat(e.target.value) * 1000) / 1000,
          [e.target.name]:
            Math.round(
              (parseFloat(e.target.value) / exchangerate.exchangerate) * 1000
            ) / 1000,
        });

      currency === 'UZS' &&
        !autoconvertation &&
        setProduct({
          ...product,
          [e.target.name + 'uzs']:
            Math.round(parseFloat(e.target.value) * 1000) / 1000,
        });

      currency === 'USD' &&
        autoconvertation &&
        setProduct({
          ...product,
          [e.target.name]: Math.round(parseFloat(e.target.value) * 1000) / 1000,
          [e.target.name + 'uzs']:
            Math.round(
              parseFloat(e.target.value) * exchangerate.exchangerate * 1000
            ) / 1000,
        });

      currency === 'USD' &&
        !autoconvertation &&
        setProduct({
          ...product,
          [e.target.name]: Math.round(parseFloat(e.target.value) * 1000) / 1000,
        });
    } else setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const uploadAllProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/registerall`,
        'POST',
        {
          market: auth.market,
          products: [...changeImports],
          currentPage,
          countPage,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${t('Barcha mahsulotlar muvaffaqqiyatli yuklandi!')}`,
        description: '',
        status: 'success',
      });
      setSearchStorage(data.products);
      setCurrentProducts(data.products);
      setProductsCount(data.count);
      clearInputs();
      setModal2(false);
    } catch (e) {
      notify({
        title: e,
        description: '',
        status: 'error',
      });
    }
  }, [
    auth,
    request,
    notify,
    clearInputs,
    changeImports,
    currentPage,
    countPage,
    sendingsearch,
  ]);

  const checkUploadData = () => {
    if (checkProducts(changeImports)) {
      return notify(checkProducts(changeImports));
    }

    for (let product of changeImports) {
      product.code = String(product.code);
    }
    uploadAllProducts();
  };

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
  const autoconvertation = true;

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

  const getNextProductCode = useCallback(
    async (e) => {
      if (e.value !== 'delete')
        try {
          const data = await request(
            `/api/products/product/productcode`,
            'POST',
            {
              market: auth.market._id,
              categoryId: e.value._id,
            },
            {
              Authorization: `Bearer ${auth.token}`,
            }
          );
          setProduct({ ...product, code: data.code, category: e.value._id });
        } catch (error) {
          notify({
            title: error,
            description: '',
            status: 'error',
          });
        }
    },
    [auth, request, notify, product]
  );

  //====================================================================
  //UseEffects
  useEffect(() => {
    getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch]);

  useEffect(() => {
    getUnits();
    getCurrency();
    getExchangerate();
    getCategory();
  }, [getUnits, getCurrency, getExchangerate, getCategory]);

  return (
    <>
      {loading ? <Loader /> : ''}
      <div className='m-3'>
        <div className='font-bold text-right'>
          Asosiy valyuta turi:{' '}
          <Currency
            value={currency === 'UZS' ? true : false}
            onToggle={changeCurrency}
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <CreateProduct
          getNextProductCode={getNextProductCode}
          categorys={categorys}
          currency={currency}
          product={product}
          keyPressed={keyPressed}
          inputHandler={inputHandler}
          saveHandler={saveHandler}
          loading={loading}
          units={units}
          clearInputs={clearInputs}
          changeUnit={changeUnit}
          selectRef={selectRef}
        />
        <div className='m-3 min-w-[800px]'>
          <TableProduct
            currency={currency}
            search={search}
            getProductExcel={getProductExcel}
            keyPress={searchKeypress}
            setImports={setImports}
            product={product}
            changeHandler={searchProducts}
            products={products}
            setRemove={setRemove}
            setModal={setModal}
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
            setModal2={setModal2}
            selectRef={selectRef}
            productsCount={productsCount}
          />
        </div>
      </div>

      <ExcelTable products={excelDatas} />

      <Modal
        modal={modal}
        setModal={setModal}
        basic={remove && remove.name}
        text={t("mahsulotni o'chirishni tasdiqlaysizmi?")}
        handler={deleteHandler}
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        handler={checkUploadData}
        text={
          <ExcelCols
            createdData={changeImports}
            setData={setChangeImports}
            data={imports}
            sections={sections}
          />
        }
      />
    </>
  );
};
