import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { RegisterIncoming } from './Incoming/RegisterIncoming';
import { useHttp } from './../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { TableIncoming } from './Incoming/TableIncoming';
import { ReportIncomings } from './Incoming/ReportIncomings';
import { Modal } from './modal/Modal';
import { RouterBtns } from './Incoming/RouterBtns';
import { ModalTable } from './Incoming/ModalTable';
import { ExcelTable } from './Incoming/ExcelTable';

export const Incoming = () => {
  const [beginDay, setBeginDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setDate(new Date().getDate())).toISOString()
  );

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  //====================================================================
  //====================================================================

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [countData, setCountData] = useState(0);
  const [currentImports, setCurrentImports] = useState([]);

  //====================================================================
  //====================================================================
  // MODAL
  const [modal, setModal] = useState(false);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Visible
  const [visible, setVisible] = useState(false);
  const [visibleTable, setVisibleTable] = useState(false);
  const [visibleReport, setVisibleReport] = useState(true);

  const changeVisibleTable = () => {
    if (!visibleTable) {
      setVisible(false);
      setVisibleReport(false);
    }
    setVisibleTable(!visibleTable);
  };

  const changeVisible = () => {
    if (!visible) {
      setVisibleTable(false);
      setVisibleReport(false);
    }
    setVisible(!visible);
  };

  const changeVisibleReport = () => {
    if (!visibleReport) {
      setVisibleTable(false);
      setVisible(false);
    }
    setVisibleReport(!visibleReport);
  };

  //====================================================================
  //====================================================================
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

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
  // SUPPLIERS
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});

  const getSuppliers = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Yetkazib beruvchilar',
          value: 'all',
        },
      ];
      data.map((supplier) => {
        return s.push({
          label: supplier.name,
          value: supplier._id,
          supplier: { ...supplier },
        });
      });
      setSuppliers(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // CATEGORYS
  const [categorys, setCategorys] = useState([]);

  const getCategorys = useCallback(async () => {
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
          label: 'Barcha kategriyalar',
          value: 'all',
        },
      ];
      data.map((category) => {
        return s.push({
          label: (
            <span className='flex justify-between font-bold'>
              <span>{category.code}</span>
              <span>{category.name && category.name}</span>
            </span>
          ),
          value: category._id,
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
  }, [request, auth, notify]);

  const changeCategory = (e) => {
    if (e.value === 'all') {
      setProductType(productTypes);
      setProducts(allproducts);
    } else {
      const filter = productTypes.filter((producttype) => {
        return (
          producttype.value !== 'all' &&
          producttype.producttype.category === e.value
        );
      });
      const filter2 = allproducts.filter(
        (product) => product.category === e.value
      );
      setProductType(filter);
      setProducts(filter2);
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // PRODUCTTYPE
  const [productType, setProductType] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const getProductType = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/producttype/getincoming`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Barcha mahsulot turlari',
          value: 'all',
        },
      ];
      data.map((producttype) => {
        return s.push({
          label: producttype.name,
          value: producttype._id,
          producttype: { ...producttype },
        });
      });
      setProductType(s);
      setProductTypes(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeProductType = (e) => {
    if (e.value === 'all') {
      setProducts(allproducts);
    } else {
      const filter = allproducts.filter(
        (produc) =>
          produc && produc.product && produc.product.producttype === e.value
      );
      setProducts(filter);
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Product
  const [allproducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [incomings, setIncomings] = useState([]);
  const [incoming, setIncoming] = useState({
    totalprice: 0,
    unitprice: 0,
    pieces: 0,
    user: auth.userId,
    supplier: '',
    product: {},
    category: '',
    producttype: '',
    brand: '',
    unit: '',
  });

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getallincoming`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: 'Barcha mahsulotlar',
          value: 'all',
        },
      ];
      data.map((product) => {
        return s.push({
          label: (
            <span className='font-bold grid grid-cols-6'>
              <span>{product.code}</span>
              <span className='col-span-3'>{product.name}</span>
              <span className='col-span-2'>
                {product.brand && product.brand.name}
              </span>
            </span>
          ),
          value: product._id,
          category: product.category._id,
          product: { ...product },
        });
      });
      setProducts(s);
      setAllProducts(s);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeProduct = (e) => {
    if (e.value === 'all') {
      return setIncoming({
        totalprice: 0,
        unitprice: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        category: '',
        producttype: '',
        brand: '',
        unit: '',
      });
    }
    setIncoming({
      totalprice: 0,
      unitprice: 0,
      pieces: 0,
      user: auth.userId,
      supplier,
      product: {
        _id: e.product._id && e.product._id,
        name: e.product.name && e.product.name,
        code: e.product && e.product.code,
      },
      category: e.product.category && e.product.category,
      producttype: e.product.producttype && e.product.producttype,
      brand: e.product.brand && e.product.brand,
      unit: e.product.unit && e.product.unit,
    });
    setModal(true);
  };

  const addIncoming = () => {
    if (incoming.pieces === 0 || incoming.pieces === '') {
      return notify({
        title: 'Diqqat! Mahsulot soni kiritilmagan.',
        description: 'Iltimos Qabul qilinayotgan mahsulot sonini kiriting.',
        status: 'warning',
      });
    }
    if (incoming.unitprice === 0 || incoming.unitprice === '') {
      return notify({
        title: 'Diqqat! Mahsulot narxi kiritilmagan.',
        description: 'Iltimos Qabul qilinayotgan mahsulot narxini kiriting.',
        status: 'warning',
      });
    }
    let i = [...incomings];
    i.unshift({ ...incoming });
    setIncomings(i);
    setIncoming({
      totalprice: 0,
      unitprice: 0,
      pieces: 0,
      user: auth.userId,
      supplier: '',
      product: {},
      category: '',
      producttype: '',
      brand: '',
      unit: '',
    });
    setModal(false);
  };

  const editIncoming = (product, index) => {
    setIncoming(product);
    let i = [...incomings];
    i.splice(index, 1);
    setIncomings(i);
    setModal(true);
  };

  const removeIncoming = (index) => {
    let i = [...incomings];
    i.splice(index, 1);
    setIncomings(i);
  };

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // CONNECTORS
  const [totalprice, setTotalPrice] = useState(0);
  const [totalproducts, setTotalProducts] = useState(0);
  const [totalproducttypes, setTotalProductTypes] = useState(0);

  const [dailyConnectors, setDailyConnectors] = useState([]);

  const daily = useCallback((connectors) => {
    if (connectors.length === 0) {
      setTotalPrice(0);
      setTotalProducts(0);
      // setSupplier(supplier);
      setTotalProductTypes(0);
      setDailyConnectors([]);
      return;
    }
    let price = 0;
    let producttype = 0;
    let product = 0;
    let connectorss = [];
    let connector = {};
    for (const key in connectors) {
      if (key === '0') {
        connector.total = connectors[key].total;
        connector.producttypes = connectors[key].incoming.length;
        connector.products = connectors[key].incoming.reduce((summ, produc) => {
          return summ + produc.pieces;
        }, 0);
        connector.suppliers = 1;
        connector.day = connectors[key].createdAt;
      } else {
        if (
          new Date(connectors[parseInt(key)].createdAt).toLocaleDateString() ===
          new Date(connectors[parseInt(key) - 1].createdAt).toLocaleDateString()
        ) {
          connector.total += connectors[key].total;
          connector.producttypes += connectors[key].incoming.length;
          connector.suppliers += 1;
          connector.products += connectors[key].incoming.reduce(
            (summ, produc) => {
              return summ + produc.pieces;
            },
            0
          );
        } else {
          connectorss.push(connector);
          connector = {};
          connector.total = connectors[key].total;
          connector.producttypes = connectors[key].incoming.length;
          connector.products = connectors[key].incoming.reduce(
            (summ, produc) => {
              return summ + produc.pieces;
            },
            0
          );
          connector.suppliers = 1;
          connector.day = connectors[key].createdAt;
        }
      }
      price += connectors[key].total;
      producttype += connectors[key].incoming.length;
      product += connectors[key].incoming.reduce((summ, produc) => {
        return summ + produc.pieces;
      }, 0);
    }
    connectorss.push(connector);
    setTotalPrice(price);
    setTotalProducts(product);
    // setSupplier(supplier);
    setTotalProductTypes(producttype);
    setDailyConnectors(connectorss);
  }, []);

  const [connectors, setConnectors] = useState([]);

  const getIncomingConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/getconnectors`,
        'POST',
        { market: auth.market._id, beginDay, endDay },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setConnectors(data);
      daily(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, daily, beginDay, endDay]);

  const sortSuppliers = (e) => {
    if (e.value === 'all') {
      daily(connectors);
    } else {
      const filter = connectors.filter((item) => item.supplier._id === e.value);
      daily(filter);
    }
  };

  const changeIncomingCard = useCallback((e) => {
    setCurrentPage(0);
    setStartDate(new Date(new Date(e).setHours(0, 0, 0, 0)).toISOString());
    setEndDate(new Date(new Date(e).setHours(23, 59, 59, 0)).toISOString());
    setVisibleReport(false);
    setVisibleTable(true);
  }, []);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // IMPORTS
  const [imports, setImports] = useState([]);
  const [excelTable, setExcelTable] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  const getImports = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/get`,
        'POST',
        {
          market: auth.market._id,
          beginDay: startDate,
          endDay: endDate,
          currentPage,
          countPage,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCountData(data.count);
      setSearchStorage(data.incomings);
      setCurrentImports(data.incomings);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, currentPage, countPage, startDate, endDate]);

  const getImportsExcel = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/getexcel`,
        'POST',
        {
          market: auth.market._id,
          beginDay: startDate,
          endDay: endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExcelTable(data);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, startDate, endDate]);

  useEffect(() => {
    getImports();
  }, [currentPage, countPage, getImports, startDate, endDate]);

  //====================================================================
  //====================================================================
  const [connectorCount, setConnectorCount] = useState(0);
  const getConnectorCount = useCallback(async () => {
    try {
      const data = await request(
        '/api/products/incoming/getcount',
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setConnectorCount(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // SEARCH
  const searchCategory = (e) => {
    const searching = allproducts.filter(
      (item) =>
        item.product.category.code.toString().includes(e.target.value) ||
        item.product.category.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );

    setProducts(searching);
  };

  const searchSupplier = (e) => {
    const searching = searchStorage.filter((item) =>
      item.supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setImports(searching);
    setCurrentImports(searching.slice(0, countPage));
  };

  const searchCategoryTable = (e) => {
    const searching = searchStorage.filter(
      (item) =>
        String(item.category.code).includes(e.target.value) ||
        String(item.product.code).includes(e.target.value)
    );
    setImports(searching);
    setCurrentImports(searching.slice(0, countPage));
  };

  const searchProduct = (e) => {
    const searching = searchStorage.filter(
      (item) =>
        item.producttype.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setImports(searching);
    setCurrentImports(searching.slice(0, countPage));
  };

  const searchBrand = (e) => {
    const searching = searchStorage.filter((item) =>
      item.brand.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setImports(searching);
    setCurrentImports(searching.slice(0, countPage));
  };

  //====================================================================
  //====================================================================
  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);
  //====================================================================
  //====================================================================
  // InputHandler
  const inputHandler = (e) => {
    if (e.target.name === 'pieces') {
      let val = e.target.value;
      setIncoming({
        ...incoming,
        pieces: val === '' ? '' : Math.round(val * 100) / 100,
        totalprice:
          val === ''
            ? ''
            : Math.round(incoming.unitprice * e.target.value * 100) / 100,
      });
    }
    if (e.target.name === 'unitprice') {
      let val = e.target.value;
      setIncoming({
        ...incoming,
        unitprice: val === '' ? '' : Math.round(val * 100) / 100,
        totalprice:
          val === ''
            ? '0'
            : Math.round(e.target.value * incoming.pieces * 100) / 100,
      });
    }
    if (e.target.name === 'totalprice') {
      let val = e.target.value;
      setIncoming({
        ...incoming,
        unitprice:
          val === '' || val === 0
            ? ''
            : Math.round((e.target.value / incoming.pieces) * 100) / 100,
        totalprice: val === '' ? '' : Math.round(val * 100) / 100,
      });
    }
  };
  //====================================================================
  //====================================================================

  const selectRef = {
    supplier: useRef(),
    category: useRef(),
    producttype: useRef(),
    product: useRef(),
  };

  const clearSelect = useCallback(() => {
    selectRef.supplier.current.selectOption({
      label: 'Yetkazib beruvchilar',
      value: 'all',
    });
    selectRef.category.current.selectOption({
      label: 'Barcha kategoriyalar',
      value: 'all',
    });
    selectRef.producttype.current.selectOption({
      label: 'Barcha mahsulot turlari',
      value: 'all',
    });
    selectRef.product.current.selectOption({
      label: 'Barcha mahsulotlar',
      value: 'all',
    });
  }, [
    selectRef.category,
    selectRef.supplier,
    selectRef.producttype,
    selectRef.product,
  ]);

  //====================================================================
  //====================================================================
  // CreateHandler
  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/registerall`,
        'POST',
        {
          market: auth.market._id,
          user: auth.userId,
          products: [...incomings],
          beginDay,
          endDay,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setConnectors(data);
      daily(data);
      clearSelect();
      setIncomings([]);
      setIncoming({
        totalprice: 0,
        unitprice: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        category: '',
        producttype: '',
        brand: '',
        unit: '',
      });
      setVisible(false);
      setVisibleReport(true);
      notify({
        title: `Mahsulotlar qabul qilindi!`,
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
  }, [
    auth,
    request,
    beginDay,
    endDay,
    setIncomings,
    setIncoming,
    setVisible,
    incomings,
    notify,
    clearSelect,
    daily,
  ]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Search
  const changeDate = (e) => {
    e.target.name === 'startDate'
      ? setStartDate(
          new Date(new Date(e.target.value).setHours(0, 0, 0, 0)).toISOString()
        )
      : setEndDate(
          new Date(
            new Date(e.target.value).setHours(23, 59, 59, 0)
          ).toISOString()
        );
  };
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // useEffect

  const [n, setN] = useState(0);
  useEffect(() => {
    if (auth.market && !n) {
      setN(1);
      getSuppliers();
      getCategorys();
      getProducts();
      getProductType();
      // getBrand();
      getConnectorCount();
    }
  }, [
    auth,
    getSuppliers,
    n,
    getCategorys,
    getProducts,
    getProductType,
    getConnectorCount,
    beginDay,
    endDay,
  ]);

  useEffect(() => {
    getIncomingConnectors();
  }, [getIncomingConnectors, beginDay, endDay]);
  //====================================================================
  //====================================================================

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[1100px]'>
        <RouterBtns
          changeVisible={changeVisible}
          changeVisibleTable={changeVisibleTable}
          changeVisibleReport={changeVisibleReport}
        />
        <div className={visible ? '' : 'd-none'}>
          <RegisterIncoming
            createHandler={createHandler}
            removeIncoming={removeIncoming}
            addIncoming={addIncoming}
            inputHandler={inputHandler}
            clearSelect={clearSelect}
            searchCategory={searchCategory}
            incomings={incomings}
            editIncoming={editIncoming}
            incoming={incoming}
            changeProduct={changeProduct}
            changeCategory={changeCategory}
            changeProductType={changeProductType}
            products={products}
            categorys={categorys}
            productType={productType}
            loading={loading}
            suppliers={suppliers}
            supplier={supplier}
            setSupplier={setSupplier}
            setModal={setModal}
            selectRef={selectRef}
          />
        </div>
        <div className={visibleReport ? '' : 'hidden'}>
          <ReportIncomings
            changeIncomingCard={changeIncomingCard}
            setBeginDay={setBeginDay}
            setEndDay={setEndDay}
            totalproducts={totalproducts}
            totalprice={totalprice}
            totalproducttypes={totalproducttypes}
            dailyConnectors={dailyConnectors}
            suppliers={suppliers}
            sortSuppliers={sortSuppliers}
          />
        </div>
        <div className={visibleTable ? '' : 'hidden'}>
          <TableIncoming
            getImportsExcel={getImportsExcel}
            countData={countData}
            changeDate={changeDate}
            startDate={startDate}
            endDate={endDate}
            currentImports={currentImports}
            imports={imports}
            setCurrentImports={setCurrentImports}
            setImports={setImports}
            searchCategoryTable={searchCategoryTable}
            searchSupplier={searchSupplier}
            searchProduct={searchProduct}
            searchBrand={searchBrand}
            countPage={countPage}
            setCountPage={setCountPage}
            currentPage={currentPage}
            setPageSize={setPageSize}
            loading={loading}
            setCurrentPage={setCurrentPage}
            connectorCount={connectorCount}
          />
        </div>
      </div>

      <ExcelTable datas={excelTable} />

      <Modal
        modal={modal}
        setModal={setModal}
        handler={addIncoming}
        text={<ModalTable incoming={incoming} inputHandler={inputHandler} />}
      />
    </div>
  );
};
