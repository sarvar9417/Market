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
import { checkProducts } from './checkData';
import { Modal } from './modal/Modal';
import { TableProduct } from './Product/TableProduct';
import { ExcelCols } from './Product/excelTable/ExcelCols';
import { t } from 'i18next';
import { ExcelTable } from './Product/ExcelTable';

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
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
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
          market: auth && auth.market._id,
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

  //====================================================================

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

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

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
  // UseEffects
  useEffect(() => {
    auth.market && getProducts();
  }, [getProducts, currentPage, countPage, sendingsearch, auth]);

  return (
    <>
      {/* {loading ? <Loader /> : ''} */}

      <div className='overflow-x-auto'>
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
