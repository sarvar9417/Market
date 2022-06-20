import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Loader } from '../../../loader/Loader';
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

export const Product = () => {
  //====================================================================
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [remove, setRemove] = useState();

  const selectRef = {
    // category: useRef(),
    // producttype: useRef(),
    // brand: useRef(),
    unit: useRef(),
  };
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

  const [product, setProduct] = useState({
    market: auth.market && auth.market._id,
    code: '',
    name: '',
    total: 0,
    incomingprice: 0,
    sellingprice: 0,
  });
  const sections = [
    { name: t('Mahsulot kodi'), value: 'code' },
    { name: t('Mahsulot nomi'), value: 'name' },
    { name: t("O'lchov birligi"), value: 'unit' },
    { name: t('Soni'), value: 'total' },
    { name: t('Kelish narxi'), value: 'incomingprice' },
    { name: t('Sotish narxi'), value: 'sellingprice' },
  ];

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const clearInputs = useCallback(() => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      input.value = '';
    }

    selectRef.unit.current.selectOption({
      label: "O'lchov birligi",
      value: 'delete',
    });
    setProduct({
      market: auth.market && auth.market._id,
      total: 0,
      code: '',
      name: '',
      incomingprice: 0,
      sellingprice: 0,
    });
  }, [auth, selectRef.unit]);
  //====================================================================
  //====================================================================
  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({});
  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [changeImports, setChangeImports] = useState([]);
  const [imports, setImports] = useState([]);

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

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

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
          label: "O'lchov birligi",
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

  //====================================================================

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
    if (checkProduct(product)) {
      return notify(checkProduct(product));
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
        { ...remove, market: auth.market && auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t("mahsuloti o'chirildi!")}`,
        description: '',
        status: 'success',
      });
      getProducts();
      clearInputs();
      setModal(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, remove, notify, clearInputs, getProducts]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const inputHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  //====================================================================
  //====================================================================

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
      setProduct({
        market: auth.market && auth.market._id,
      });
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

  //====================================================================
  //====================================================================
  // SEARCH
  const searchProducts = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.code.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.name.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }

    // if (e.target.name === 'category') {
    //   setSearch({
    //     ...search,
    //     categorycode: e.target.value,
    //     productcode: e.target.value,
    //   });

    //   const searching = searchStorage.filter(
    //     (item) =>
    //       item.category.code.includes(e.target.value) ||
    //       item.code.includes(e.target.value)
    //   );
    //   setCurrentProducts(searching);
    // }
    // if (e.target.name === 'producttype') {
    //   setSearch({
    //     ...search,
    //     producttype: e.target.value,
    //     productname: e.target.value,
    //   });

    //   const searching = searchStorage.filter(
    //     (item) =>
    //       (item.producttype &&
    //         item.producttype.name
    //           .toLowerCase()
    //           .includes(e.target.value.toLowerCase())) ||
    //       item.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   );
    //   setCurrentProducts(searching);
    // }
    // if (e.target.name === 'brand') {
    //   setSearch({ ...search, brand: e.target.value });
    //   const searching = searchStorage.filter(
    //     (item) =>
    //       item.brand &&
    //       item.brand.name.toLowerCase().includes(e.target.value.toLowerCase())
    //   );
    //   setCurrentProducts(searching);
    // }
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
  //====================================================================

  //====================================================================
  //====================================================================
  // const [changedCurrentPage, setChangedCurrentPage] = useState(currentPage);
  useEffect(() => {
    getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch]);

  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getUnits();
      getProducts();
    }
  }, [getUnits, n, getProducts]);

  //====================================================================
  //====================================================================

  return (
    <>
      {loading ? <Loader /> : ''}
      <div className='overflow-x-auto'>
        <CreateProduct
          setProduct={setProduct}
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
        text={t("mahsulotnti o'chirishni tasdiqlaysizmi?")}
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
