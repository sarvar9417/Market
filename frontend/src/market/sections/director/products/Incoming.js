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
import { t } from 'i18next';
import { TemporayCheque } from './Temporary/TemporaryCheque';
import { Temporaries } from './Temporary/Temporaries';

export const Incoming = () => {
  const [beginDay, setBeginDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );
  //====================================================================
  //PAGINATION

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [countData, setCountData] = useState(0);
  const [currentImports, setCurrentImports] = useState([]);

  //====================================================================
  // MODAL
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);

  //====================================================================
  // Visible
  const [visible, setVisible] = useState(false);
  const [visibleTable, setVisibleTable] = useState(false);
  const [visibleReport, setVisibleReport] = useState(true);
  const [visibleTemporary, setVisibleTemporary] = useState(false);

  const changeVisibleTable = () => {
    setVisible(false);
    setVisibleReport(false);
    setVisibleTemporary(false);
    setVisibleTable(true);
  };

  const changeVisible = () => {
    setVisibleTable(false);
    setVisibleReport(false);
    setVisibleTemporary(false);
    setVisible(true);
  };

  const changeVisibleReport = () => {
    setVisibleTable(false);
    setVisible(false);
    setVisibleTemporary(false);
    setVisibleReport(true);
    setReportSuppliersVisible(false);
    setDailyVisible(true);
  };

  const changeVisibleTemporary = () => {
    setVisibleTable(false);
    setVisible(false);
    setVisibleTemporary(true);
    setVisibleReport(false);
  };

  const [currenttemporary, setCurrentTemporary] = useState();
  //====================================================================
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  //====================================================================
  //TOAST
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
  //====================================================================
  //====================================================================
  const [reportSuppliersVisible, setReportSuppliersVisible] = useState(false);
  const [dailyVisible, setDailyVisible] = useState(true);
  const [suppliersConnector, setSuppliersConnector] = useState([]);

  const connectSuppliers = useCallback((data) => {
    let sup = [];
    data.map((item, index) => {
      let obj = {
        _id: item.supplier._id,
        createdAt: item.createdAt,
        supplier: item.supplier.name,
        pieces: item.pieces,
        totalprice: item.totalprice,
        incomings: 1,
      };
      data.map((el, ind) => {
        if (
          index !== ind &&
          el.supplier._id.toString() === item.supplier._id.toString()
        ) {
          obj.pieces += el.pieces;
          obj.totalprice += el.totalprice;
          obj.incomings += 1;
          return item;
        }
        return item;
      });
      return sup.push(obj);
    });
    let filter = sup.filter(
      (v, i, a) => a.findIndex((v2) => v2.supplier === v.supplier) === i
    );
    setSuppliersConnector(filter);
  }, []);

  const changeSupplier = (e) => {
    const filter = searchStorage.filter((item) => item.supplier._id === e);
    setCurrentImports(filter);
    setVisibleReport(false);
    setVisibleTable(true);
  };

  //====================================================================
  //====================================================================
  // SUPPLIERS
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});

  const getSuppliers = useCallback(async () => {
    try {
      const data = await request(
        `/api/supplier/getincoming`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let s = [
        {
          label: t('Yetkazib beruvchilar'),
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
  // Product
  const [allproducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [incomings, setIncomings] = useState([]);
  const [incoming, setIncoming] = useState({
    totalprice: 0,
    unitprice: 0,
    totalpriceuzs: 0,
    unitpriceuzs: 0,
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
          label: t('Barcha mahsulotlar'),
          value: 'all',
        },
      ];
      data.map((product) => {
        return s.push({
          label:
            product.category.code +
            product.productdata.code +
            ' ' +
            product.productdata.name,
          value: product._id,
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
        totalpriceuzs: 0,
        unitpriceuzs: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        unit: '',
      });
    }
    for (const i in incomings) {
      if (incomings[i].product._id === e.product._id) {
        return notify({
          title: `${t("Diqqat! Ushbu mahsulot ro'yxatga")} ${
            parseInt(i) + 1
          } ${t('-raqamda kiritilgan.')}`,
          description: t(
            "Qiymatlarini o'zgartirish uchun tahrirlash tugmasini bosishingiz mumkin"
          ),
          status: 'warning',
        });
      }
    }

    setIncoming({
      totalprice: 0,
      unitprice: 0,
      totalpriceuzs: 0,
      unitpriceuzs: 0,
      pieces: 0,
      user: auth.userId,
      supplier,
      product: {
        _id: e.product._id && e.product._id,
        name: e.product.productdata && e.product.productdata.name,
        code: e.product.productdata && e.product.productdata.code,
      },
      unit: e.product.unit && e.product.unit,
      oldprice: e.product.price.incomingprice,
      oldpriceuzs: e.product.price.incomingpriceuzs,
    });
    setModal(true);
  };

  const addIncoming = () => {
    if (incoming.pieces === 0 || incoming.pieces === '') {
      return notify({
        title: t('Diqqat! Mahsulot soni kiritilmagan.'),
        description: t('Iltimos Qabul qilinayotgan mahsulot sonini kiriting'),
        status: 'warning',
      });
    }
    if (incoming.unitprice === 0 || incoming.unitprice === '') {
      return notify({
        title: t('Diqqat! Mahsulot narxi kiritilmagan.'),
        description: t('Iltimos Qabul qilinayotgan mahsulot narxini kiriting.'),
        status: 'warning',
      });
    }
    let i = [...incomings];
    i.unshift({ ...incoming });
    setIncomings(i);
    setIncoming({
      totalprice: 0,
      unitprice: 0,
      totalpriceuzs: 0,
      unitpriceuzs: 0,
      pieces: 0,
      user: auth.userId,
      supplier: '',
      product: {},
      unit: '',
    });
    setModal(false);
    clearProducts();
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
  // CONNECTORS
  const [totalprice, setTotalPrice] = useState(0);
  const [totalpriceuzs, setTotalPriceUzs] = useState(0);
  const [totalproducts, setTotalProducts] = useState(0);
  const [totalproducttypes, setTotalProductTypes] = useState(0);

  const [dailyConnectors, setDailyConnectors] = useState([]);

  const daily = useCallback((connectors) => {
    if (connectors.length === 0) {
      setTotalPrice(0);
      setTotalProducts(0);
      setSupplier({});
      setTotalProductTypes(0);
      setDailyConnectors([]);
      return;
    }
    let price = 0;
    let priceuzs = 0;
    let producttype = 0;
    let product = 0;
    let connectorss = [];
    let connector = {};
    for (const key in connectors) {
      if (key === '0') {
        connector.total = connectors[key].total;
        connector.totaluzs = connectors[key].totaluzs;
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
          connector.totaluzs += connectors[key].totaluzs;
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
          connector.totaluzs = connectors[key].totaluzs;
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
      priceuzs += connectors[key].totaluzs;
      producttype += connectors[key].incoming.length;
      product += connectors[key].incoming.reduce((summ, produc) => {
        return summ + produc.pieces;
      }, 0);
    }
    connectorss.push(connector);
    setTotalPrice(price);
    setTotalPriceUzs(priceuzs);
    setTotalProducts(product);
    setSupplier({});
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
    // setVisibleReport(false);
    // setVisibleTable(true);
    setDailyVisible(false);
    setReportSuppliersVisible(true);
  }, []);

  //====================================================================
  // IMPORTS

  const [search, setSearch] = useState({ supplier: '', code: '', name: '' });
  const [sendingsearch, setSendingSearch] = useState({
    supplier: '',
    code: '',
    name: '',
  });
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
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCountData(data.count);
      setSearchStorage(data.incomings);
      setCurrentImports(data.incomings);
      connectSuppliers(data.incomings);
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
    currentPage,
    countPage,
    startDate,
    endDate,
    sendingsearch,
    connectSuppliers,
  ]);

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

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch({ ...search });
    }
  };

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
    setCurrentImports(searching);
    setSearch({ ...search, supplier: e.target.value });
  };

  const searchProduct = (e) => {
    const searching = searchStorage.filter((item) =>
      item.product.productdata.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentImports(searching);
    setSearch({ ...search, name: e.target.value });
  };

  const searchProductCode = (e) => {
    const searching = searchStorage.filter((item) =>
      item.product.productdata.code
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentImports(searching);
    setSearch({ ...search, code: e.target.value });
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
        pieces: val === '' ? '' : Math.round(val * 10000) / 10000,
        totalprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(
                incoming.unitprice *
                  (e.target.value / exchangerate.exchangerate) *
                  10000
              ) / 10000
            : Math.round(incoming.unitprice * e.target.value * 10000) / 10000,
        totalpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(incoming.unitpriceuzs * e.target.value * 10000) / 10000
            : Math.round(
                incoming.unitpriceuzs *
                  (e.target.value * exchangerate.exchangerate) *
                  10000
              ) / 10000,
      });
    }
    if (e.target.name === 'unitprice') {
      let val = e.target.value;
      setIncoming({
        ...incoming,
        unitprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round((val / exchangerate.exchangerate) * 10000) / 10000
            : Math.round(val * 10000) / 10000,
        unitpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(val * 10000) / 10000
            : Math.round(val * exchangerate.exchangerate * 10000) / 10000,
        totalprice:
          val === ''
            ? '0'
            : currency === 'UZS'
            ? Math.round(
                (e.target.value / exchangerate.exchangerate) *
                  incoming.pieces *
                  10000
              ) / 10000
            : Math.round(e.target.value * incoming.pieces * 10000) / 10000,
        totalpriceuzs:
          val === ''
            ? '0'
            : currency === 'UZS'
            ? Math.round(e.target.value * incoming.pieces * 10000) / 10000
            : Math.round(
                e.target.value *
                  exchangerate.exchangerate *
                  incoming.pieces *
                  10000
              ) / 10000,
      });
    }
    if (e.target.name === 'totalprice') {
      let val = e.target.value;
      setIncoming({
        ...incoming,
        unitprice:
          val === '' || val === 0
            ? ''
            : currency === 'UZS'
            ? Math.round(
                (val / exchangerate.exchangerate / incoming.pieces) * 10000
              ) / 10000
            : Math.round((val / incoming.pieces) * 10000) / 10000,
        unitpriceuzs:
          val === '' || val === 0
            ? ''
            : currency === 'UZS'
            ? Math.round((val / incoming.pieces) * 10000) / 10000
            : Math.round(
                ((val * exchangerate.exchangerate) / incoming.pieces) * 10000
              ) / 10000,
        totalprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round((val / exchangerate.exchangerate) * 10000) / 10000
            : Math.round(val * 10000) / 10000,
        totalpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(val * 10000) / 10000
            : Math.round(val * exchangerate.exchangerate * 10000) / 10000,
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
      label: t('Yetkazib beruvchilar'),
      value: 'all',
    });
    selectRef.product.current.selectOption({
      label: t('Barcha mahsulotlar'),
      value: 'all',
    });
    setIncomings([]);
  }, [selectRef.supplier, selectRef.product]);

  const clearProducts = useCallback(() => {
    selectRef.product.current.selectOption({
      label: t('Barcha mahsulotlar'),
      value: 'all',
    });
  }, [selectRef.product]);

  //====================================================================
  //====================================================================
  // CreateHandler
  const deleteTemporarys = useCallback(
    async (id) => {
      try {
        const data = await request(
          `/api/products/temporary/delete`,
          'POST',
          {
            market: auth.market._id,
            _id: id,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        setTemporarys(data);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, notify, auth]
  );

  const changeSaveIncoming = () => {
    if (incomings.length === 0) {
      return notify({
        title: t('Diqqat! Qabul qilish uchun mahsulotlar tanlanmagan.'),
        status: 'warning',
      });
    }
    setModal6(true);
  };

  const createHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/registerall`,
        'POST',
        {
          market: auth.market._id,
          user: auth.userId,
          products: [...incomings],
          startDate: beginDay,
          endDate: endDay,
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
        totalpriceuzs: 0,
        unitpriceuzs: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        unit: '',
      });
      setVisible(false);
      setVisibleReport(true);
      notify({
        title: t(`Mahsulotlar qabul qilindi!`),
        description: '',
        status: 'success',
      });
      getImports();
      setModal6(false);
      if (currenttemporary) {
        deleteTemporarys(currenttemporary._id);
      }
      setCheckTemporary(false);
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
    getImports,
    currenttemporary,
    deleteTemporarys,
  ]);

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
  const [editProduct, setEditProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState({});

  const changeEditProduct = (e) => {
    setEditProduct(e);
    setModal2(true);
  };

  const changeDeleteProduct = (e) => {
    setDeleteProduct(e);
    setModal3(true);
  };

  const editHandler = (e) => {
    if (e.target.name === 'pieces') {
      let val = e.target.value;
      setEditProduct({
        ...editProduct,
        pieces: val === '' ? '' : Math.round(val * 10000) / 10000,
        totalprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(
                editProduct.unitprice *
                  (e.target.value / exchangerate.exchangerate) *
                  10000
              ) / 10000
            : Math.round(editProduct.unitprice * e.target.value * 10000) /
              10000,
        totalpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(editProduct.unitpriceuzs * e.target.value * 10000) /
              10000
            : Math.round(
                editProduct.unitpriceuzs *
                  (e.target.value * exchangerate.exchangerate) *
                  10000
              ) / 10000,
      });
    }
    if (e.target.name === 'unitprice') {
      let val = e.target.value;
      setEditProduct({
        ...editProduct,
        unitprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round((val / exchangerate.exchangerate) * 10000) / 10000
            : Math.round(val * 10000) / 10000,
        unitpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(val * 10000) / 10000
            : Math.round(val * exchangerate.exchangerate * 10000) / 10000,
        totalprice:
          val === ''
            ? '0'
            : currency === 'UZS'
            ? Math.round(
                (e.target.value / exchangerate.exchangerate) *
                  editProduct.pieces *
                  10000
              ) / 10000
            : Math.round(e.target.value * editProduct.pieces * 10000) / 10000,
        totalpriceuzs:
          val === ''
            ? '0'
            : currency === 'UZS'
            ? Math.round(e.target.value * editProduct.pieces * 10000) / 10000
            : Math.round(
                e.target.value *
                  exchangerate.exchangerate *
                  editProduct.pieces *
                  10000
              ) / 10000,
      });
    }
    if (e.target.name === 'totalprice') {
      let val = e.target.value;
      setEditProduct({
        ...editProduct,
        unitprice:
          val === '' || val === 0
            ? ''
            : currency === 'UZS'
            ? Math.round(
                (val / exchangerate.exchangerate / editProduct.pieces) * 10000
              ) / 10000
            : Math.round((val / editProduct.pieces) * 10000) / 10000,
        unitpriceuzs:
          val === '' || val === 0
            ? ''
            : currency === 'UZS'
            ? Math.round((val / editProduct.pieces) * 10000) / 10000
            : Math.round(
                ((val * exchangerate.exchangerate) / editProduct.pieces) * 10000
              ) / 10000,
        totalprice:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round((val / exchangerate.exchangerate) * 10000) / 10000
            : Math.round(val * 10000) / 10000,
        totalpriceuzs:
          val === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(val * 10000) / 10000
            : Math.round(val * exchangerate.exchangerate * 10000) / 10000,
      });
    }
  };

  const editProductHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/update`,
        'PUT',
        {
          market: auth.market._id,
          product: editProduct,
          startDate: beginDay,
          endDate: endDay,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setEditProduct({});
      setConnectors(data);
      daily(data);
      clearSelect();
      setIncomings([]);
      setIncoming({
        totalprice: 0,
        unitprice: 0,
        totalpriceuzs: 0,
        unitpriceuzs: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        unit: '',
      });
      setModal2(false);
      notify({
        title: t(`Mahsulot tahrirlandi!`),
        description: '',
        status: 'success',
      });
      getImports();
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
    notify,
    clearSelect,
    daily,
    getImports,
    editProduct,
  ]);

  const deleteProductHandler = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/incoming/delete`,
        'DELETE',
        {
          market: auth.market._id,
          product: deleteProduct,
          startDate: beginDay,
          endDate: endDay,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setDeleteProduct({});
      setConnectors(data);
      daily(data);
      clearSelect();
      setIncomings([]);
      setIncoming({
        totalprice: 0,
        unitprice: 0,
        totalpriceuzs: 0,
        unitpriceuzs: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        unit: '',
      });
      setModal3(false);
      notify({
        title: t(`Mahsulot o'chirildi!`),
        description: '',
        status: 'success',
      });
      getImports();
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
    notify,
    clearSelect,
    daily,
    getImports,
    deleteProduct,
  ]);

  //====================================================================
  //TEMPORARY

  const [temporary, setTemporary] = useState({
    incomings,
    supplier,
  });
  const [temporarys, setTemporarys] = useState([]);

  const [checkTemporary, setCheckTemporary] = useState(false);

  const saveTemporary = () => {
    if (incomings.length === 0) {
      return notify({
        title: t(
          "Diqqat! Qabulni vaqtincha saqlash uchun kamida bitta mahsulot kiritilgan bo'lishi kerak."
        ),
        status: 'warning',
      });
    }
    setModal4(true);
  };

  const confirmSaveTemporary = () => {
    setModal4(false);
    setTemporary({
      incomings,
      supplier,
    });
    setCheckTemporary(true);
    clearSelect();
    createTemporary();
    setVisibleTemporary(true);
    if (currenttemporary) {
      deleteTemporarys(currenttemporary._id);
      setCurrentTemporary();
    }
  };

  const createTemporary = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/temporary/register`,
        'POST',
        {
          market: auth.market._id,
          temporaryincoming: {
            supplier,
            incomings,
          },
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTemporarys(data);
      setVisibleTable(false);
      setVisible(false);
      setVisibleTemporary(true);
      setVisibleReport(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify, auth, incomings, supplier]);

  const getTemporarys = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/temporary/get`,
        'POST',
        {
          market: auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTemporarys(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify, auth]);

  const changeTemporary = (e) => {
    selectRef.supplier.current.selectOption({
      label: e.temporaryincoming.supplier.name,
      value: e.temporaryincoming.supplier._id,
    });
    setIncomings(e.temporaryincoming.incomings);
    setSupplier(e.temporaryincoming.supplier);
    setVisibleTemporary(false);
    setVisible(true);
    setCurrentTemporary(e);
  };
  const [delTemporary, setDelTemporary] = useState({});

  const deleteTemporary = (e) => {
    setDelTemporary(e);
    setModal5(true);
  };

  const confirmDeleteTemporary = () => {
    deleteTemporarys(delTemporary._id);
    setModal5(false);
    notify({
      title: t("Saqlangan qabul qilish amaliyoti muvaffaqqiyatli o'chirildi"),
      status: 'success',
    });
  };

  const changeTemporaryCheck = (e) => {
    setTemporary(e.temporaryincoming);
    setCheckTemporary(true);
  };

  const [currency, setCurrency] = useState('UZS');

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

  useEffect(() => {
    getTemporarys();
    getCurrency();
  }, [getTemporarys, getCurrency]);

  //====================================================================
  //====================================================================
  // useEffect
  const [n, setN] = useState(0);

  useEffect(() => {
    getImports();
  }, [currentPage, countPage, getImports, startDate, endDate, sendingsearch]);

  useEffect(() => {
    if (auth.market && !n) {
      setN(1);
      getSuppliers();
      getProducts();
      getConnectorCount();
    }
  }, [auth, getSuppliers, n, getProducts, getConnectorCount, beginDay, endDay]);

  useEffect(() => {
    getIncomingConnectors();
  }, [getIncomingConnectors, beginDay, endDay]);

  useEffect(() => {
    getExchangerate();
  }, [getExchangerate]);
  //====================================================================
  //====================================================================
  return (
    <div className='overflow-x-auto'>
      <div className={`${checkTemporary ? '' : 'hidden'}`}>
        <TemporayCheque temporary={temporary} setCheck={setCheckTemporary} />
      </div>

      <RouterBtns
        currency={currency}
        changeCurrency={changeCurrency}
        changeVisibleTemporary={changeVisibleTemporary}
        changeVisible={changeVisible}
        changeVisibleTable={changeVisibleTable}
        changeVisibleReport={changeVisibleReport}
        setDailyVisible={setDailyVisible}
        setReportSuppliersVisible={setReportSuppliersVisible}
      />
      <div className={`${visibleTemporary ? 'm-3' : 'hidden'}`}>
        <Temporaries
          changeTemporaryCheck={changeTemporaryCheck}
          deleteTemporary={deleteTemporary}
          temporarys={temporarys}
          changeTemporary={changeTemporary}
        />
      </div>
      <div className={visible ? 'h-screen m-3' : 'd-none'}>
        <RegisterIncoming
          currency={currency}
          saveTemporary={saveTemporary}
          changeSaveIncoming={changeSaveIncoming}
          removeIncoming={removeIncoming}
          inputHandler={inputHandler}
          clearSelect={clearSelect}
          searchCategory={searchCategory}
          incomings={incomings}
          editIncoming={editIncoming}
          incoming={incoming}
          changeProduct={changeProduct}
          products={products}
          loading={loading}
          suppliers={suppliers}
          supplier={supplier}
          setSupplier={setSupplier}
          setModal={setModal}
          selectRef={selectRef}
        />
      </div>
      <div className='m-3'>
        <div className={visibleReport ? '' : 'hidden'}>
          <ReportIncomings
            currency={currency}
            changeSupplier={changeSupplier}
            suppliersConnector={suppliersConnector}
            dailyVisible={dailyVisible}
            setDailyVisible={setDailyVisible}
            reportSuppliersVisible={reportSuppliersVisible}
            setReportSuppliersVisible={setReportSuppliersVisible}
            changeIncomingCard={changeIncomingCard}
            setBeginDay={setBeginDay}
            setEndDay={setEndDay}
            totalproducts={totalproducts}
            totalprice={totalprice}
            totalpriceuzs={totalpriceuzs}
            totalproducttypes={totalproducttypes}
            dailyConnectors={dailyConnectors}
            suppliers={suppliers}
            sortSuppliers={sortSuppliers}
          />
        </div>
        <div className={visibleTable ? 'min-w-[990px]' : 'hidden'}>
          <TableIncoming
            currency={currency}
            changeDeleteProduct={changeDeleteProduct}
            changeEditProduct={changeEditProduct}
            searchKeypress={searchKeypress}
            searchProductCode={searchProductCode}
            getImportsExcel={getImportsExcel}
            countData={countData}
            changeDate={changeDate}
            startDate={startDate}
            endDate={endDate}
            currentImports={currentImports}
            setCurrentImports={setCurrentImports}
            searchSupplier={searchSupplier}
            searchProduct={searchProduct}
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
        text={
          <ModalTable
            currency={currency}
            incoming={incoming}
            inputHandler={inputHandler}
            keyPressed={addIncoming}
          />
        }
      />

      <Modal
        setModal={setModal2}
        modal={modal2}
        text={
          <ModalTable
            currency={currency}
            incoming={editProduct}
            inputHandler={editHandler}
            keyPressed={editProductHandler}
          />
        }
        handler={editProductHandler}
      />

      <Modal
        setModal={setModal3}
        modal={modal3}
        basic={`${deleteProduct.product && deleteProduct.product.name} ${t(
          "qabul qilingan mahsulotini o'chirishni tasdiqlaysizmi?"
        )}`}
        handler={deleteProductHandler}
      />

      <Modal
        modal={modal4}
        setModal={setModal4}
        handler={confirmSaveTemporary}
        basic={t('Qabul qilishni vaqtincha saqlashni tasdiqlaysizmi?')}
      />
      <Modal
        modal={modal5}
        setModal={setModal5}
        handler={confirmDeleteTemporary}
        basic={t(
          "Diqqat! Saqlangan qabul qilishni o'chirishni tasdiqlaysizmi?"
        )}
      />
      <Modal
        modal={modal6}
        setModal={setModal6}
        handler={createHandler}
        basic={t(
          'Diqqat! Barcha qabul qilingan mahsulotlarni omborga kirim qilishni tasdiqlaysizmi?'
        )}
      />
    </div>
  );
};
