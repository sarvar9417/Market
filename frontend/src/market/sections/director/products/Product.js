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
import { TableProduct } from './productComponents/TableProduct';
import { ExcelCols } from './productComponents/excelTable/ExcelCols';
import { CreateProduct } from './productComponents/CreateProduct';
import { t } from 'i18next';
import { ExcelTable } from './Category/ExcelTable';

export const Product = () => {
  //====================================================================
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const indexLastProduct = (currentPage + 1) * countPage;
  const indexFirstProduct = indexLastProduct - countPage;
  const [currentProducts, setCurrentProducts] = useState([]);

  //====================================================================
  //====================================================================
  const excelRef = useRef();
  //====================================================================
  //====================================================================
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [remove, setRemove] = useState();

  const selectRef = {
    category: useRef(),
    producttype: useRef(),
    brand: useRef(),
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
    total: 0,
    incomingprice: 0,
    sellingprice: 0,
  });
  const sections = [
    { name: t('Kategoriya kodi'), value: 'category' },
    { name: t('Mahsulot turi'), value: 'producttype' },
    { name: t('Brend'), value: 'brand' },
    { name: t('Mahsulot kodi'), value: 'code' },
    { name: t('Mahsulot nomi'), value: 'name' },
    { name: t("O'lchov birligi"), value: 'unit' },
    { name: t('Narxi'), value: 'price' },
    { name: t('Soni'), value: 'total' },
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
    selectRef.category.current.selectOption({
      label: 'Kategoriya',
      value: 'delete',
    });
    selectRef.producttype.current.selectOption({
      label: 'Mahsulot',
      value: 'delete',
    });
    selectRef.brand.current.selectOption({
      label: 'Brand',
      value: 'delete',
    });
    selectRef.unit.current.selectOption({
      label: "O'lchov birligi",
      value: 'delete',
    });
    setProduct({
      market: auth.market && auth.market._id,
      total: 0,
      incomingprice: 0,
      sellingprice: 0,
    });
  }, [
    auth,
    selectRef.category,
    selectRef.producttype,
    selectRef.brand,
    selectRef.unit,
  ]);
  //====================================================================
  //====================================================================

  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    categorycode: '',
    productcode: '',
    producttype: '',
    productname: '',
    brand: '',
  });
  const [sendingsearch, setSendingSearch] = useState({});
  // const [sendingsearch, setSendingSearch] = useState({});
  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [searchStorage, setSearchStrorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
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
      console.log(data.products);
      setSearchStrorage(data.products);
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
    setSearchStrorage,
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
  //====================================================================

  //====================================================================
  //====================================================================
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/category/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Kategoriya',
          value: 'delete',
        },
      ];
      data.map((category) => {
        return s.push({
          label: category.code,
          value: category._id,
        });
      });
      setCategories(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeCategory = (e) => {
    if (e.value === 'delete') {
      setProductTypes(allproducttypes);
      setProduct({ ...product, category: null });
    }
    setProduct({ ...product, category: e.value });
    const filter = allproducttypes.filter((item) => {
      return item.producttype && item.producttype.category === e.value;
    });
    setProductTypes(filter);
  };
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
  //====================================================================

  //====================================================================
  //====================================================================
  const [producttypes, setProductTypes] = useState();
  const [allproducttypes, setAllProductTypes] = useState();
  const getProductTypes = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getproducttypes`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Mahsulot turi',
          value: 'delete',
        },
      ];
      data.map((producttype) => {
        return s.push({
          label: producttype.name,
          value: producttype._id,
          producttype: { ...producttype },
        });
      });
      setProductTypes(s);
      setAllProductTypes(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeProductType = (e) => {
    if (e.value === 'delete') {
      setProduct({ ...product, producttype: null });
    }
    setProduct({ ...product, producttype: e.value });
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  const [brands, setBrands] = useState([]);

  const getBrand = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/brand/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Brend',
          value: 'delete',
        },
      ];
      data.map((brand) => {
        return s.push({
          label: brand.name,
          value: brand._id,
        });
      });
      setBrands(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeBrand = (e) => {
    if (e.value === 'delete') {
      setProduct({ ...product, brand: null });
    }
    setProduct({ ...product, brand: e.value });
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/register`,
        'POST',
        { ...product },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${data.name} ${t('mahsuloti yaratildi!')}`,
        description: '',
        status: 'success',
      });
      getProducts();
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, product, notify, clearInputs, getProducts]);

  const updateHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/update`,
        'PUT',
        { ...product },

        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      notify({
        title: `${data.name} ${t('mahsuloti yangilandi!')}`,
        description: '',
        status: 'success',
      });
      getProducts();
      clearInputs();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, product, notify, clearInputs, getProducts]);

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
        { market: auth.market, products: [...changeImports] },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      notify({
        title: `${t('Barcha mahsulolar yuklandi!')}`,
        description: '',
        status: 'success',
      });
      setProducts(data);
      setSearchStrorage(data);
      setCurrentProducts(data.slice(indexFirstProduct, indexLastProduct));
      setTableExcel(data);
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
    indexFirstProduct,
    indexLastProduct,
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
    if (e.target.name === 'category') {
      setSearch({
        ...search,
        categorycode: e.target.value,
        productcode: e.target.value,
      });

      const searching = searchStorage.filter(
        (item) =>
          item.category.code.includes(e.target.value) ||
          item.code.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'producttype') {
      setSearch({
        ...search,
        producttype: e.target.value,
        productname: e.target.value,
      });

      const searching = searchStorage.filter(
        (item) =>
          (item.producttype &&
            item.producttype.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'brand') {
      setSearch({ ...search, brand: e.target.value });
      const searching = searchStorage.filter(
        (item) =>
          item.brand &&
          item.brand.name.toLowerCase().includes(e.target.value.toLowerCase())
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
  //====================================================================

  //====================================================================
  //====================================================================
  // const [changedCurrentPage, setChangedCurrentPage] = useState(currentPage);
  useEffect(() => {
    // if (currentPage > changedCurrentPage || currentPage < changedCurrentPage) {
    getProducts();
    // setChangedCurrentPage(currentPage);
  }, [getProducts, currentPage, countPage, sendingsearch]);

  const [n, setN] = useState();
  useEffect(() => {
    if (!n) {
      setN(1);
      getCategories();
      getProductTypes();
      getUnits();
      getBrand();
      getProducts();
    }
  }, [getUnits, getCategories, getProductTypes, getBrand, n, getProducts]);
  //====================================================================
  //====================================================================
  return (
    <>
      {loading ? <Loader /> : ''}
      <div className='content-wrapper px-lg-5 px-3'>
        <div className='row gutters'>
          <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
            <CreateProduct
              changeCategory={changeCategory}
              producttypes={producttypes}
              changeProductType={changeProductType}
              categories={categories}
              setProduct={setProduct}
              product={product}
              keyPressed={keyPressed}
              inputHandler={inputHandler}
              saveHandler={saveHandler}
              loading={loading}
              units={units}
              brands={brands}
              clearInputs={clearInputs}
              changeBrand={changeBrand}
              changeUnit={changeUnit}
              selectRef={selectRef}
            />
            <TableProduct
              getProductExcel={getProductExcel}
              producttypes={producttypes}
              keyPress={searchKeypress}
              setImports={setImports}
              product={product}
              changeHandler={searchProducts}
              categories={categories}
              products={products}
              tableExcel={tableExcel}
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
              market={auth.market}
              productsCount={productsCount}
              excelRef={excelRef}
            />
          </div>
        </div>
      </div>

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

      <div className='d-none'>
        <ExcelTable data={excelDatas} />
      </div>
    </>
  );
};
