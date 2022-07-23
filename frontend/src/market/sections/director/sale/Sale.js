import { t } from 'i18next';
import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Modal } from '../components/Modal';
import { InputProduct } from './components/InputProduct';
import { Products } from './ProductsSelling/Products';
import { Selling } from './ProductsSelling/Selling';
import { Card } from './PaymentCard/Card';
import { Sales } from './Sales';
import { Cheque } from './PaymentCard/Cheque';
import { ChequeConnectors } from './Sales/ChequeConnectors';
import { EditSelling } from './EditSelling';
import { discountProcient, returnProduct } from './returnProduct/returnProduct';
import { CardEdit } from './EditPaymentCard/CardEdit';
import { RouterBtns } from './RouterBtns/RouterBtns';
import { ExcelTable } from './Sales/ExcelTable';
import { PrePaymentCard } from './PrePaymentCard/PrepaymentCard';
import { TemporayCheque } from './Temporary/TemporaryCheque';
import { Temporaries } from './Temporary/Temporaries';

export const Sale = () => {
  //====================================================================
  //====================================================================
  // SearchData
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortedSaleConnectors, setSortedSaleConnectors] = useState([]);
  //====================================================================
  //====================================================================

  const sortSaleConnectors = useCallback((data) => {
    let filterconnectors = [];
    data.map((connector) => {
      let productss = [];
      connector.products.map((product) => {
        if (product.pieces > 0) {
          if (product.saleproducts.length > 0) {
            let obj = {
              ...product,
              pieces:
                product.pieces +
                product.saleproducts.reduce(
                  (prev, sale) => prev + sale.pieces,
                  0
                ),
              totalprice:
                product.totalprice +
                product.saleproducts.reduce(
                  (prev, sale) => prev + sale.totalprice,
                  0
                ),
              totalpriceuzs:
                product.totalpriceuzs +
                product.saleproducts.reduce(
                  (prev, sale) => prev + sale.totalpriceuzs,
                  0
                ),
            };
            productss.push(obj);
            return product;
          }
          productss.push(product);
          return product;
        }
        return null;
      });
      filterconnectors.push({ ...connector, products: [...productss] });
      return connector;
    });
    setSortedSaleConnectors(filterconnectors);
  }, []);

  //====================================================================
  //====================================================================
  // Toast
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
  // AUTH
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [modal8, setModal8] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleTemporary, setVisibleTemporary] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkConnectors, setCheckConnectors] = useState(false);
  const [sellingCard, setSellingCard] = useState(false);
  const [sellingEditCard, setSellingEditCard] = useState(false);
  const [tableCard, setTableCard] = useState(true);

  const changeSellingCard = () => {
    setTableCard(false);
    setSellingEditCard(false);
    setSellingCard(true);
    setVisibleTemporary(false);
  };

  const changeTableCard = () => {
    setSellingCard(false);
    setSellingEditCard(false);
    setTableCard(true);
    setVisibleTemporary(false);
    setEditSaleConnector({});
  };

  const changeSellingEditCard = () => {
    setSellingCard(false);
    setTableCard(false);
    setSellingEditCard(true);
    setVisibleTemporary(false);
  };

  const changeVisibleTemporary = () => {
    setSellingCard(false);
    setTableCard(false);
    setSellingEditCard(false);
    setVisibleTemporary(true);
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
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

  //====================================================================
  //====================================================================
  // Saleprducts
  const [products, setProducts] = useState([]);
  const [saleproduct, setSaleProduct] = useState({
    total: 0,
    product: {},
    totalprice: 0,
    totalpriceuzs: 0,
    pieces: 0,
    unitprice: 0,
    unitpriceuzs: 0,
  });
  const [saleproducts, setSaleProducts] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalpriceuzs, setTotalPriceUzs] = useState(0);
  const [sales, setSales] = useState({
    products: [],
    payment: {},
    debt: {},
    discount: {},
    user: {},
  });
  const [allSales, setAllSales] = useState({
    products: [],
    payments: [],
    debts: [],
    discounts: [],
    user: [],
  });
  const [saleCounts, setSaleCounts] = useState(0);

  const getProducts = useCallback(async () => {
    try {
      const data = await request(
        `/api/products/product/getproductsale`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let c = [];
      data.map((product) => {
        return c.push({
          label:
            '(' +
            product.total +
            ') ' +
            product.productdata.code +
            ' ' +
            product.productdata.name,
          type: 'product',
          value: product,
        });
      });
      setProducts(c);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const [excelTable, setExcelTable] = useState([]);

  const changeProduct = (e) => {
    if (e.value.price.sellingprice === 0) {
      return notify({
        title: t(
          'Diqqat! Ushbu mahsulotga narx belgilanmagan. Mahsulotni sotish imkoni mavjud emas.'
        ),
        description: t(
          "Sotuvdan oldin mahsulotga sotuv narxini belgilashingizni so'raymiz."
        ),
        status: 'warning',
      });
    }

    for (const saleproduct of saleproducts) {
      if (e.value._id === saleproduct.product._id) {
        return notify({
          title: t("Diqqat! Ushbu mahsulot ro'yxatga qo'shilgan."),
          description: t(
            "Qayta qo'shmasdan qiymatini o'zgartirishingiz mumkin."
          ),
          status: 'warning',
        });
      }
    }

    setModal(true);
    setSaleProduct({
      total: e.value.total,
      product: e.value,
      totalprice: Math.round(e.value.price.sellingprice * 10000) / 10000,
      totalpriceuzs:
        Math.round(e.value.price.sellingprice * exchangerate.exchangerate * 1) /
        1,
      pieces: 1,
      unitprice: Math.round(e.value.price.sellingprice * 10000) / 10000,
      unitpriceuzs: Math.round(
        (e.value.price.sellingprice * exchangerate.exchangerate * 1) / 1
      ),
    });
  };

  const setCounts = (e) => {
    let pieces = saleproduct.pieces;
    let unitprice = saleproduct.unitprice;
    let unitpriceuzs = saleproduct.unitpriceuzs;
    let totalprice = saleproduct.totalprice;
    let totalpriceuzs = saleproduct.totalpriceuzs;
    if (e.target.name === 'pieces') {
      if (parseFloat(e.target.value) > saleproduct.total) {
        return notify({
          title: t(
            'Diqqat! Ushbu mahsulot soni omborda mavjud mahsulot sonidan oshmasligi lozim.'
          ),
          description: `${t('Omborda mavjud mahsulot soni')} ${
            saleproduct.total
          }`,
          status: 'warning',
        });
      }
      totalprice =
        Math.round(
          (!unitprice ? 0 : unitprice) * parseFloat(e.target.value) * 10000
        ) / 10000;
      totalpriceuzs =
        Math.round(
          (!unitprice ? 0 : unitpriceuzs) * parseFloat(e.target.value) * 1
        ) / 1;
      setSaleProduct({
        ...saleproduct,
        pieces: e.target.value === '' ? '' : parseFloat(e.target.value),
        totalprice: e.target.value === '' ? 0 : totalprice,
        totalpriceuzs: e.target.value === '' ? 0 : totalpriceuzs,
      });
    }
    if (e.target.name === 'unitprice') {
      totalprice =
        Math.round(
          (!pieces ? 0 : pieces) *
            (currency === 'UZS'
              ? parseFloat(e.target.value / exchangerate.exchangerate)
              : parseFloat(e.target.value)) *
            10000
        ) / 10000;
      totalpriceuzs =
        Math.round(
          (!pieces ? 0 : pieces) *
            (currency === 'UZS'
              ? parseFloat(e.target.value)
              : parseFloat(e.target.value * exchangerate.exchangerate)) *
            1
        ) / 1;
      setSaleProduct({
        ...saleproduct,
        unitprice:
          e.target.value === ''
            ? ''
            : currency === 'UZS'
            ? Math.round(
                parseFloat(e.target.value / exchangerate.exchangerate) * 1000
              ) / 1000
            : parseFloat(e.target.value),
        unitpriceuzs:
          e.target.value === ''
            ? ''
            : currency === 'UZS'
            ? parseFloat(e.target.value)
            : Math.round(
                parseFloat(e.target.value) * exchangerate.exchangerate * 1
              ) / 1,
        totalprice: e.target.value === '' ? 0 : totalprice,
        totalpriceuzs:
          e.target.value === ''
            ? 0
            : currency === 'UZS'
            ? pieces * e.target.value
            : Math.round(totalprice * exchangerate.exchangerate * 1) / 1,
      });
    }
  };
  const pushSaleProduct = () => {
    let sales = [...saleproducts];
    sales.unshift(saleproduct);
    setSaleProduct({
      total: 0,
      product: 0,
      totalprice: 0,
      totalpriceuzs: 0,
      pieces: 0,
      unitprice: 0,
      unitpriceuzs: 0,
    });
    setModal(false);
    setSaleProducts(sales);

    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ;
    }, 0);

    let totaluzs = sales.reduce((summ, sale) => {
      return sale.totalpriceuzs + summ;
    }, 0);

    setTotalPrice(Math.round(total * 10000) / 10000);
    setTotalPriceUzs(Math.round(totaluzs * 1) / 1);

    setPayment({
      ...payment,
      totalprice: Math.round(total * 10000) / 10000,
      totalpriceuzs: Math.round(totaluzs * 1) / 1,
      type: 'cash',
      cash: Math.round(total * 10000) / 10000,
      cashuzs: Math.round(totaluzs * 1) / 1,
      discount: 0,
      discountuzs: 0,
    });
  };

  const editProducts = (product, index, type) => {
    let sales = [...saleproducts];
    sales.splice(index, 1);
    if (type === 'edit') {
      setSaleProduct(product);
      setModal(true);
    }

    setSaleProducts(sales);

    let total = sales.reduce((summ, sale) => {
      return sale.totalprice + summ;
    }, 0);

    let totaluzs = sales.reduce((summ, sale) => {
      return sale.totalpriceuzs + summ;
    }, 0);

    setTotalPrice(Math.round(total * 10000) / 10000);
    setTotalPriceUzs(Math.round(totaluzs * 1) / 1);

    setPayment({
      ...payment,
      totalprice: Math.round(total * 10000) / 10000,
      totalpriceuzs: Math.round(totaluzs * 1) / 1,
      type: 'cash',
      cash: Math.round(total * 10000) / 10000,
      cashuzs: Math.round(totaluzs * 1) / 1,
      discount: 0,
      discountuzs: 0,
    });
  };

  const saleHandler = () => {
    if (saleproducts.length === 0) {
      return notify({
        title: t('Diqqat! Mahsulotlar kiritilmagan'),
        description: '',
        status: 'warning',
      });
    }
    // if (!client.name || client.name.length < 1) {
    //   return notify({
    //     title: t('Diqqat! Mijoz ismi kiritilmagan.'),
    //     description: 'Iltimos! Mijoz ismini kiriting.',
    //     status: 'warning',
    //   });
    // }
    setVisible(true);
  };

  // Saleconnectors
  const [saleconnectors, setSaleConnectors] = useState([]);
  const [search, setSearch] = useState({ id: '', client: '' });
  const [sendingsearch, setSendingSearch] = useState({ id: '', client: '' });

  const getSaleConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/getconnectors`,
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          startDate,
          endDate,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let dataClone = JSON.parse(JSON.stringify(data));
      setSaleCounts(data.count);
      setSaleConnectors(data.saleconnectors);
      setCurrentProducts(data.saleconnectors);
      sortSaleConnectors(dataClone.saleconnectors);
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
    countPage,
    currentPage,
    startDate,
    endDate,
    sendingsearch,
    sortSaleConnectors,
  ]);

  const getSaleConnectorsExcel = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/getconnectorsexcel`,
        'POST',
        {
          market: auth.market._id,
          startDate,
          endDate,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExcelTable(data.saleconnectors);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, startDate, endDate, sendingsearch]);

  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);

  // clients
  const [clients, setClients] = useState([]);
  const [storageClients, setStorageClients] = useState([]);
  const [client, setClient] = useState({});

  const getClients = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/client/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let v = [
        {
          label: t('Barcha mijozlar'),
          value: 'all',
        },
      ];

      data.map((type) => {
        return v.push({
          label: type.name,
          value: type._id,
          packman: type.packman && type.packman._id,
        });
      });
      setStorageClients(v);
      setClients(v);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changeClient = (e) => {
    setClient({
      name: e.label,
      _id: e.value,
      packman: e.packman || null,
    });
  };

  const inputClient = (e) => {
    setClient({
      name: e.target.value,
    });
  };
  const changeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'id') {
      const searching = saleconnectors.filter((item) =>
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentProducts(searching);
    } else {
      const searching = saleconnectors.filter(
        (item) =>
          item.client &&
          item.client.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentProducts(searching);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };
  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Packmans
  const [packmans, setPackmans] = useState([]);
  const [packman, setPackman] = useState({});

  const getPackmans = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/packman/getall`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      let v = [];

      data.map((type) => {
        return v.push({
          label: type.name,
          value: type._id,
        });
      });
      setPackmans(v);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const changePackman = (e) => {
    setPackman({
      name: e.label,
      _id: e.value,
    });
    if (e.value === 'all') {
      setClients(storageClients);
    } else {
      const filter = storageClients.filter((item) => item.packman === e.value);
      setClients(filter);
    }
  };

  // Discount and Payment
  const [currenttemporary, setCurrentTemporary] = useState();
  const deleteTemporarys = useCallback(
    async (id) => {
      try {
        const data = await request(
          `/api/sales/temporary/delete`,
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
  const [discount, setDiscount] = useState({
    discount: 0,
    discountuzs: 0,
    procient: 0,
    isProcient: true,
  });

  const [debt, setDebt] = useState({
    debt: 0,
    debtuzs: 0,
    comment: '',
  });

  const [payment, setPayment] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: 'cash',
    cash: totalprice,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });

  const clearDatas = useCallback(() => {
    setPayment({
      totalprice: 0,
      totalpriceuzs: 0,
      type: 'cash',
      cash: 0,
      card: 0,
      transfer: 0,
      carduzs: 0,
      cashuzs: 0,
      transferuzs: 0,
      discount: 0,
      discountuzs: 0,
    });
    setDebt({
      debt: 0,
      debtuzs: 0,
      comment: '',
    });
    setDiscount({
      discount: 0,
      discountuzs: 0,
      procient: 0,
      isProcient: false,
    });
    setSaleProducts([]);
    setTotalPrice(0);
    setTotalPriceUzs(0);
    setPackman({});
    setClient({});
    setPaymentType({
      type: 'cash',
      name: t('Naqt'),
    });

    setEditTotalPrice(0);
    setEditTotalPriceUzs(0);
    setEditDiscounts([]);
    setEditExchanrate({ exchangerate: 0 });
    setEditPayments([]);
    setEditSaleConnector({});
    setEditSaleConnectorId(0);
    setEditSaleProducts([]);

    setPrePaymentVisible(false);
    setPrePaymentSaleConnector({});
    setPrePaymentTotalPrice({});
    setPrePaymentTotalPriceUzs({});
    setPrePayment({
      totalprice: 0,
      totalpriceuzs: 0,
      type: 'cash',
      cash: 0,
      card: 0,
      transfer: 0,
      carduzs: 0,
      cashuzs: 0,
      transferuzs: 0,
      discount: 0,
      discountuzs: 0,
    });
    setPrePaymentType({
      type: 'cash',
      name: t('Naqt'),
    });
    setPrePaymentDebt({
      debt: 0,
      debtuzs: 0,
      comment: '',
    });
  }, []);

  let types = ['cash', 'card', 'transfer', 'mixed'];

  const changeDiscount = (e, p) => {
    if (discount.isProcient && e.target.value > 5) {
      return notify({
        title: t('Diqqat! 5% yuqori chegirma kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    if (
      !discount.isProcient &&
      Math.round(e.target.value * 10000) / 10000 > totalprice
    ) {
      return notify({
        title: t(
          'Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'
        ),
        description: '',
        status: 'error',
      });
    }
    p.discount =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;
    p.discountuzs =
      Math.round(e.target.value * exchangerate.exchangerate * 1) / 1;
    p.cash = 0;
    p.card = 0;
    p.transfer = 0;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * e.target.value) / 100
              : e.target.value)) *
            exchangerate.exchangerate *
            1
        ) / 1,
    });

    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 10000) / 10000,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                1
            ) / 1,
        })
      : setDiscount({
          ...discount,
          procient:
            Math.round(((e.target.value * 100) / totalprice) * 10000) / 10000,
          discount: Math.round(e.target.value * 10000) / 10000,
          discountuzs:
            Math.round(e.target.value * exchangerate.exchangerate * 1) / 1,
        });
  };

  const changeDiscountUzs = (e, p) => {
    if (discount.isProcient && e.target.value > 100) {
      return notify({
        title: t(
          'Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'
        ),
        description: '',
        status: 'error',
      });
    }
    if (
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000 >
      totalprice
    ) {
      return notify({
        title: t(
          'Diqqat! Umumiy summadan yuqori chegirma kiritish mumkin emas!'
        ),
        description: '',
        status: 'error',
      });
    }
    p.discount =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;
    p.discountuzs = e.target.value === '' ? '' : e.target.value;
    p.cash = 0;
    p.card = 0;
    p.transfer = 0;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (totalprice -
            (discount.isProcient
              ? (totalprice * (e.target.value / exchangerate.exchangerate)) /
                100
              : e.target.value / exchangerate.exchangerate)) *
            exchangerate.exchangerate *
            1
        ) / 1,
    });
    discount.isProcient
      ? setDiscount({
          ...discount,
          procient: e.target.value,
          discount:
            Math.round(((totalprice * e.target.value) / 100) * 10000) / 10000,
          discountuzs:
            Math.round(
              ((totalprice * e.target.value * exchangerate.exchangerate) /
                100) *
                1
            ) / 1,
        })
      : setDiscount({
          ...discount,
          procient:
            Math.round(
              (((e.target.value / exchangerate.exchangerate) * 100) /
                totalprice) *
                10000
            ) / 10000,
          discount:
            Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000,
          discountuzs: Math.round(e.target.value * 1) / 1,
        });
  };

  const changeType = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : payment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : payment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : payment.transfer);

    if (Math.round((total + discount.discount) * 10000) / 10000 > totalprice) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      Math.round(e.target.value * 1 * exchangerate.exchangerate) / 1;
    setDebt({
      ...debt,
      debt:
        Math.round((totalprice - (total + discount.discount)) * 10000) / 10000,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            1
        ) / 1,
    });
  };

  const changeTypeUzs = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : payment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : payment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : payment.transfer);

    if (Math.round((total + discount.discount) * 10000) / 10000 > totalprice) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      e.target.value === '' ? '' : Math.round(e.target.value * 1) / 1;
    setDebt({
      ...debt,
      debt:
        Math.round((totalprice - (total + discount.discount)) * 10000) / 10000,
      debtuzs:
        Math.round(
          (totalprice - (total + discount.discount)) *
            exchangerate.exchangerate *
            1
        ) / 1,
    });
  };

  const changeHandler = (e) => {
    let p = { ...payment };
    if (e.target.dataset.type === 'discount') {
      if (e.target.dataset.money === 'UZS') changeDiscountUzs(e, p);
      else changeDiscount(e, p);
    } else {
      if (e.target.dataset.money === 'UZS') {
        changeTypeUzs(e, p);
      } else changeType(e, p);
    }
    setPayment(p);
  };

  const [paymentType, setPaymentType] = useState({
    type: 'cash',
    name: t('Naqt'),
  });

  const typeHandler = (e) => {
    if (e.target.dataset.type === 'debt') return;
    let p = { ...payment };
    if (
      e.target.dataset.type === 'mixed' ||
      e.target.dataset.type === 'discount'
    ) {
      if (e.target.dataset.type === 'mixed') p.type = 'mixed';
      setDebt({
        ...debt,
        debt: Math.round((totalprice - discount.discount) * 10000) / 10000,
        debtuzs:
          Math.round(
            (totalprice - discount.discount) * exchangerate.exchangerate * 1
          ) / 1,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] =
            Math.round((totalprice - discount.discount) * 10000) / 10000),
          (p[type + 'uzs'] =
            Math.round(
              (totalprice - discount.discount) * exchangerate.exchangerate * 1
            ) / 1),
          (p.type = type),
          setDebt({
            ...debt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + 'uzs'] = 0));
    });
    setPayment(p);
    setPaymentType({
      type: e.target.dataset.type,
      name: e.target.name,
    });
  };

  const changeProcient = () => {
    if (discount.isProcient) {
      setPayment({
        ...payment,
        discount: discount.discount,
        discountuzs:
          Math.round(discount.discount * exchangerate.exchangerate * 1) / 1,
      });
      setDiscount({
        ...discount,
        discount: discount.discount,
        discountuzs:
          Math.round(discount.discount * exchangerate.exchangerate * 1) / 1,
      });
    }

    if (!discount.isProcient) {
      let procient =
        Math.round(((discount.discount * 100) / totalprice) * 10000) / 10000;
      setPayment({
        ...payment,
        discount: procient,
        discountuzs: procient,
      });
      setDiscount({
        ...discount,
        discount: procient,
        discountuzs: Math.round(procient * exchangerate.exchangerate * 1) / 1,
      });
    }

    setDiscount({
      ...discount,
      isProcient: !discount.isProcient,
    });
  };

  const checkHandler = () => {
    let total =
      discount.discount +
      payment.card +
      payment.cash +
      payment.transfer +
      debt.debt;
    if (Math.round(total * 100) / 100 !== Math.round(totalprice * 100) / 100) {
      return notify({
        title: t("Diqqat! To'lov hisobida xatolik yuz bergan!"),
        description: '',
        status: 'error',
      });
    }
    // if (debt.debt > 0) {
    //   return setModal2(true);
    // }

    return setModal3(true);
  };

  const changeCheck = (e) => {
    setCheckConnectors(true);
    // unsortedProducts.map((product) => {
    //   if (product._id.toString() === e._id.toString()) {
    //     setAllSales(product);
    //     return product;
    //   }
    //   return product;
    // });
    setAllSales(e);
    window.scroll({ top: 0 });
  };

  const changeComment = (e) => {
    setDebt({ ...debt, comment: e.target.value });
  };

  const paymentComment = (e) => {
    setPayment({ ...payment, comment: e.target.value });
  };

  const createHandler = useCallback(async () => {
    try {
      setModal2(false);
      setModal3(false);
      const data = await request(
        `/api/sales/saleproducts/register`,
        'POST',
        {
          market: auth.market._id,
          saleproducts,
          client,
          packman,
          discount,
          payment,
          debt,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      data.products.sort((a, b) => {
        return a.product.productdata.code > b.product.productdata.code ? 1 : -1;
      });
      setCheck(true);
      setSales(data);
      clearDatas();
      setVisible(false);
      getSaleConnectors();
      if (currenttemporary) {
        deleteTemporarys(currenttemporary._id);
      }
      setCheckTemporary(false);
      setSellingCard(false);
      setSellingEditCard(false);
      setTableCard(true);
      setVisibleTemporary(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    notify,
    auth,
    discount,
    payment,
    debt,
    packman,
    client,
    saleproducts,
    clearDatas,
    getSaleConnectors,
    currenttemporary,
    deleteTemporarys,
  ]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Add products
  const [saleconnectorid, setSaleConnectorId] = useState();
  const addProducts = (e) => {
    setSaleConnectorId(e._id);
    setTableCard(false);
    setSellingCard(true);
    window.scroll({ top: 0 });
  };

  const addHandler = useCallback(async () => {
    try {
      setModal2(false);
      setModal3(false);
      const data = await request(
        `/api/sales/saleproducts/addproducts`,
        'POST',
        {
          market: auth.market._id,
          saleconnectorid,
          saleproducts,
          client,
          packman,
          discount,
          payment,
          debt,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      data.products.sort((a, b) => {
        return a.product.productdata.code > b.product.productdata.code ? 1 : -1;
      });
      setCheck(true);
      setSales(data);
      clearDatas();
      setVisible(false);
      getSaleConnectors();
      setSaleConnectorId();
      if (currenttemporary) {
        deleteTemporarys(currenttemporary._id);
      }
      setCheckTemporary(false);
      setCheckTemporary(false);
      setSellingCard(false);
      setSellingEditCard(false);
      setTableCard(true);
      setVisibleTemporary(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    notify,
    auth,
    discount,
    payment,
    debt,
    packman,
    client,
    saleproducts,
    clearDatas,
    getSaleConnectors,
    saleconnectorid,
    currenttemporary,
    deleteTemporarys,
  ]);

  //====================================================================
  //====================================================================

  //====================================================================
  //====================================================================
  // Edit products
  const [editExchanrate, setEditExchanrate] = useState({
    exchangerate: 0,
  });
  const [paymentEdit, setPaymentEdit] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: 'cash',
    cash: 0,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });
  const [paymentTypeEdit, setPaymentTypeEdit] = useState({
    type: 'cash',
    name: t('Naqt'),
  });
  const [editSaleProducts, setEditSaleProducts] = useState([]);
  const [editSaleConnectorId, setEditSaleConnectorId] = useState({ _id: 0 });
  const [editSaleConnector, setEditSaleConnector] = useState({});
  const [editPayments, setEditPayments] = useState([]);
  const [editDiscounts, setEditDiscounts] = useState([]);
  const [editTotalPrice, setEditTotalPrice] = useState(0);
  const [editTotalPriceUzs, setEditTotalPriceUzs] = useState(0);

  const editHandler = (e) => {
    let connectorArr = sortedSaleConnectors.filter(
      (item) => item._id === e._id
    );
    let connector = connectorArr[0];
    setEditTotalPrice(
      connector.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0)
    );
    setEditTotalPriceUzs(
      connector.products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0)
    );
    setEditSaleConnector(connector);
    let products = [];
    connector.products.forEach((product) => {
      products.push({ ...product, pieces: 0, totalprice: 0, totalpriceuzs: 0 });
    });
    setEditSaleProducts(products);
    setEditSaleConnectorId(connector._id);
    setEditPayments([...connector.payments]);
    setEditDiscounts([...connector.discounts]);
    // setSaleProducts([...e.products]);
    setTableCard(false);
    setSellingEditCard(true);
    window.scroll({ top: 0 });
  };

  const typeHandlerEdit = (e) => {
    if (e.target.dataset.type === 'debt') return;

    let p = { ...paymentEdit };
    p.type = e.target.dataset.type;
    if (e.target.dataset.type === 'mixed') {
      if (e.target.dataset.type === 'mixed') p.type = 'mixed';
      setDebt({
        ...debt,
        debt:
          Math.round(
            (editTotalPrice -
              editDiscounts.reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0) -
              editPayments.reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)) *
              10000
          ) / 10000,
        debtuzs:
          Math.round(
            (editTotalPriceUzs -
              editDiscounts.reduce((summ, discount) => {
                return summ + discount.discountuzs;
              }, 0) -
              editPayments.reduce((summ, payment) => {
                return summ + payment.paymentuzs;
              }, 0)) *
              1
          ) / 1,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] =
            Math.round(
              (editTotalPrice -
                editDiscounts.reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0) -
                editPayments.reduce((summ, payment) => {
                  return summ + payment.payment;
                }, 0)) *
                10000
            ) / 10000),
          (p[type + 'uzs'] =
            Math.round(
              (editTotalPriceUzs -
                editDiscounts.reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0) -
                editPayments.reduce((summ, payment) => {
                  return summ + payment.paymentuzs;
                }, 0)) *
                1
            ) / 1),
          (p.type = type),
          setDebt({
            ...debt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + 'uzs'] = 0));
    });
    setPaymentEdit(p);
    setPaymentTypeEdit({
      type: e.target.dataset.type,
      name: e.target.name,
    });
  };

  const changeTypeEdit = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : paymentEdit.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : paymentEdit.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : paymentEdit.transfer);

    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 10000) / 10000;

    const totals = Math.round((editTotalPrice - pays - disc) * 10000) / 10000;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      Math.round(e.target.value * 1 * editExchanrate.exchangerate) / 1;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (editTotalPrice -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (editTotalPriceUzs -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            1
        ) / 1,
    });
  };

  const changeTypeUzsEdit = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 10000) /
            10000
        : payment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 10000) /
            10000
        : payment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / editExchanrate.exchangerate) * 10000) /
            10000
        : payment.transfer);

    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 10000) / 10000;

    const totals = Math.round((editTotalPrice - pays - disc) * 10000) / 10000;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / editExchanrate.exchangerate) * 10000) /
      10000;
    p[e.target.dataset.type + 'uzs'] =
      e.target.value === '' ? '' : Math.round(e.target.value * 1) / 1;
    setDebt({
      ...debt,
      debt:
        Math.round(
          (editTotalPrice -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (editTotalPriceUzs -
            editDiscounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            editPayments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            1
        ) / 1,
    });
  };

  const changeHandlerEdit = (e) => {
    let p = { ...paymentEdit };
    if (e.target.dataset.money === 'UZS') {
      changeTypeUzsEdit(e, p);
    } else changeTypeEdit(e, p);

    setPaymentEdit(p);
  };

  const changeBack = (e) => {
    let products = [...editSaleProducts];
    if (parseFloat(e.target.value) < 0) {
      return notify({
        title: t('Diqqat! Qaytarilgan soni 0 kam bumaslik kerak!'),
        description: '',
        status: 'warning',
      });
    }
    if (
      parseFloat(e.target.value) >
      editSaleConnector.products[parseInt(e.target.id)].pieces
    ) {
      return notify({
        title: t(
          'Diqqat! Xarid qilingan mahsulotdan ortiq mahsulot qaytarishning imkoni mavjud emas!'
        ),
        description: '',
        status: 'warning',
      });
    }

    let yes = true;
    let EditDiscounts = [...editDiscounts];

    for (const i in EditDiscounts) {
      if (
        EditDiscounts[i]._id === products[parseInt(e.target.id)].discount &&
        EditDiscounts[i].procient > 0
      ) {
        yes = false;
        const count =
          products[parseInt(e.target.id)].pieces === ''
            ? 0
            : products[parseInt(e.target.id)].pieces;
        setEditSaleProducts(returnProduct(products, e));
        discountProcient(
          EditDiscounts[i],
          products[parseInt(e.target.id)],
          count
        );
      }
    }
    setEditDiscounts(EditDiscounts);
    if (yes) {
      setEditSaleProducts(returnProduct(products, e));
    }

    let total =
      Math.round(
        (editSaleConnector.products.reduce((summ, product) => {
          return summ + product.totalprice;
        }, 0) -
          products.reduce((summ, product) => {
            return summ + product.totalprice;
          }, 0)) *
          10000
      ) / 10000;

    let totaluzs =
      Math.round(
        (editSaleConnector.products.reduce((summ, product) => {
          return summ + product.totalpriceuzs;
        }, 0) -
          products.reduce((summ, product) => {
            return summ + product.totalpriceuzs;
          }, 0)) *
          1
      ) / 1;

    let cashuzs =
      Math.round(
        (totaluzs -
          EditDiscounts.reduce((summ, discount) => {
            return summ + discount.discountuzs;
          }, 0) -
          editPayments.reduce((summ, payment) => {
            return summ + payment.paymentuzs;
          }, 0)) *
          1
      ) / 1;

    let cash =
      Math.round(
        (total -
          EditDiscounts.reduce((summ, discount) => {
            return summ + discount.discount;
          }, 0) -
          editPayments.reduce((summ, payment) => {
            return summ + payment.payment;
          }, 0)) *
          10000
      ) / 10000;

    setEditTotalPrice(total);
    setEditTotalPriceUzs(totaluzs);
    setPaymentEdit({
      ...paymentEdit,
      cash: Math.round(cash * 10000) / 10000,
      cashuzs: Math.round(cashuzs * 1) / 1,
      type: 'cash',
    });
    setEditExchanrate({
      exchangerate:
        Math.round(
          (editSaleConnector.products[parseInt(e.target.id)].unitpriceuzs /
            editSaleConnector.products[parseInt(e.target.id)].unitprice) *
            10000
        ) / 10000,
    });
  };

  const checkHandlerEdit = () => {
    const disc = editDiscounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = editPayments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);

    let total =
      disc +
      pays +
      paymentEdit.card +
      paymentEdit.cash +
      paymentEdit.transfer +
      debt.debt;

    if (
      Math.round(total * 10000) / 10000 !==
      Math.round(editTotalPrice * 10000) / 10000
    ) {
      return notify({
        title: t("Diqqat! To'lov hisobida xatolik yuz bergan!"),
        description: '',
        status: 'error',
      });
    }
    // if (debt.debt > 0) {
    //   return setModal4(true);
    // }

    return setModal5(true);
  };

  const editPaymentComment = (e) => {
    setPaymentEdit({ ...paymentEdit, comment: e.target.value });
  };

  const createHandlerEdit = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/registeredit`,
        'POST',
        {
          market: auth.market._id,
          saleproducts: editSaleProducts,
          discounts: editDiscounts,
          payment: paymentEdit,
          debt,
          saleconnectorid: editSaleConnectorId,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setModal4(false);
      setModal5(false);
      setCheckConnectors(true);
      setAllSales(data);
      window.scroll({ top: 0 });
      clearDatas();
      setVisibleEdit(false);
      getSaleConnectors();
      setCheckTemporary(false);
      setSellingCard(false);
      setSellingEditCard(false);
      setTableCard(true);
      setVisibleTemporary(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    notify,
    auth,
    debt,
    editDiscounts,
    editSaleProducts,
    paymentEdit,
    editSaleConnectorId,
    getSaleConnectors,
    clearDatas,
  ]);

  const Clear = () => {
    setTotalPrice(0);
    setTotalPriceUzs(0);
    setEditSaleConnector({});
    setEditSaleProducts([]);
    setEditSaleConnectorId({ _id: 0 });
    setEditPayments([]);
    setEditDiscounts([]);
    setSaleProducts([]);
    window.scroll({ top: 0 });
  };
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
  // Search
  const [prePaymentVisible, setPrePaymentVisible] = useState(false);
  const [prePaymentSaleConnector, setPrePaymentSaleConnector] = useState({});
  const [prePaymentTotalPrice, setPrePaymentTotalPrice] = useState({});
  const [prePaymentTotalPriceUzs, setPrePaymentTotalPriceUzs] = useState({});

  const [prePayment, setPrePayment] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: 'cash',
    cash: totalprice,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });
  const [prePaymentType, setPrePaymentType] = useState({
    type: 'cash',
    name: t('Naqt'),
  });

  const [prePaymentDebt, setPrePaymentDebt] = useState({
    debt: 0,
    debtuzs: 0,
    comment: '',
  });

  const changePrepayment = (e) => {
    setPrePaymentVisible(true);
    setPrePaymentSaleConnector(e);
    setPrePaymentTotalPrice(
      Math.round(
        e.products.reduce((summ, product) => {
          return summ + product.totalprice;
        }, 0) * 10000
      ) / 10000
    );
    setPrePaymentTotalPriceUzs(
      Math.round(
        e.products.reduce((summ, product) => {
          return summ + product.totalpriceuzs;
        }, 0) * 1
      ) / 1
    );
    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (e.products.reduce((summ, product) => {
            return summ + product.totalprice;
          }, 0) -
            e.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            e.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0)) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (e.products.reduce((summ, product) => {
            return summ + product.totalpriceuzs;
          }, 0) -
            e.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            e.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0)) *
            1
        ) / 1,
    });
  };

  const typeHandlerPrePayment = (e) => {
    if (e.target.dataset.type === 'debt') return;

    let p = { ...prePayment };
    p.type = e.target.dataset.type;
    if (e.target.dataset.type === 'mixed') {
      if (e.target.dataset.type === 'mixed') p.type = 'mixed';
      setPrePaymentDebt({
        ...prePayment,
        debt:
          Math.round(
            (prePaymentTotalPrice -
              prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0) -
              prePaymentSaleConnector.payments.reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)) *
              10000
          ) / 10000,
        debtuzs:
          Math.round(
            (prePaymentTotalPriceUzs -
              prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                return summ + discount.discountuzs;
              }, 0) -
              prePaymentSaleConnector.payments.reduce((summ, payment) => {
                return summ + payment.paymentuzs;
              }, 0)) *
              1
          ) / 1,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] =
            Math.round(
              (prePaymentTotalPrice -
                prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0) -
                prePaymentSaleConnector.payments.reduce((summ, payment) => {
                  return summ + payment.payment;
                }, 0)) *
                10000
            ) / 10000),
          (p[type + 'uzs'] =
            Math.round(
              (prePaymentTotalPriceUzs -
                prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0) -
                prePaymentSaleConnector.payments.reduce((summ, payment) => {
                  return summ + payment.paymentuzs;
                }, 0)) *
                1
            ) / 1),
          (p.type = type),
          setPrePaymentDebt({
            ...prePaymentDebt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + 'uzs'] = 0));
    });
    setPrePayment(p);
    setPrePaymentType({
      type: e.target.dataset.type,
      name: e.target.name,
    });
  };

  const changeTypePrePayment = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.transfer);

    const disc = prePaymentSaleConnector.discounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = prePaymentSaleConnector.payments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 10000) / 10000;

    const totals =
      Math.round((prePaymentTotalPrice - pays - disc) * 10000) / 10000;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      Math.round(e.target.value * 1 * exchangerate.exchangerate) / 1;
    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (prePaymentTotalPrice -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (prePaymentTotalPriceUzs -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            1
        ) / 1,
    });
  };

  const changeTypePrePaymentUzs = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.transfer);

    const disc = prePaymentSaleConnector.discounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = prePaymentSaleConnector.payments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;

    const totals =
      Math.round((prePaymentTotalPrice - pays - disc) * 10000) / 10000;

    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      e.target.value === '' ? '' : Math.round(e.target.value * 1) / 1;

    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (prePaymentTotalPrice -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (prePaymentTotalPriceUzs -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            1
        ) / 1,
    });
  };

  const changeHandlerPrePayment = (e) => {
    let p = { ...prePayment };
    if (e.target.dataset.money === 'UZS') {
      changeTypePrePaymentUzs(e, p);
    } else changeTypePrePayment(e, p);
    setPrePayment(p);
  };

  const prePaymentComment = (e) => {
    setPrePayment({ ...prePayment, comment: e.target.value });
  };

  const checkPrePayment = () => {
    if (prePayment.card + prePayment.cash + prePayment.transfer === 0) {
      return notify({
        title: t("Diqqat! To'lov summasi kiritilmagan"),
        description: '',
        status: 'error',
      });
    }

    return setModal6(true);
  };

  const createHandlerPrePayment = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/payment`,
        'POST',
        {
          market: auth.market._id,
          payment: prePayment,
          saleconnectorid: prePaymentSaleConnector._id,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      setModal6(false);
      // setCheckConnectors(true);
      window.scroll({ top: 0 });
      clearDatas();
      setPrePaymentVisible(false);
      getSaleConnectors();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    notify,
    auth,
    prePayment,
    getSaleConnectors,
    clearDatas,
    prePaymentSaleConnector,
  ]);

  const changeEnter = (e) => {
    if (e.key === 'Enter') {
      pushSaleProduct();
    }
  };

  //====================================================================
  // TEMPORARY
  const [temporary, setTemporary] = useState({
    saleconnectorid: '',
    client: {},
    packman: {},
    discount: {},
    payment: {},
    debt: {},
    products: [],
  });
  const [temporarys, setTemporarys] = useState([]);

  const [checkTemporary, setCheckTemporary] = useState(false);

  const saveTemporary = () => {
    if (saleproducts.length === 0) {
      return notify({
        title: t(
          "Diqqat! Sotuvni vaqtincha saqlash uchun kamida bitta mahsulot kiritilgan bo'lishi kerak."
        ),
        status: 'warning',
      });
    }
    saleproducts.sort((a, b) => {
      return a.product.productdata.code > b.product.productdata.code ? 1 : -1;
    });
    // if (!client.name) {
    //   return notify({
    //     title:
    //       "Diqqat! Sotuvni vaqtincha saqlash uchun mijoz ma'lumotini kiriting",
    //     status: 'warning',
    //   });
    // }
    setModal7(true);
  };

  const confirmSaveTemporary = () => {
    setModal7(false);
    setTemporary({
      saleconnectorid,
      client,
      packman,
      discount,
      payment,
      debt,
      products: saleproducts,
    });
    setCheckTemporary(true);
    clearDatas();
    createTemporary();
    if (currenttemporary) {
      deleteTemporarys(currenttemporary._id);
      setCurrentTemporary();
    }
    setSellingCard(false);
    setTableCard(false);
    setSellingEditCard(false);
    setVisibleTemporary(true);
  };

  const createTemporary = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/temporary/register`,
        'POST',
        {
          market: auth.market._id,
          temporary: {
            saleconnectorid,
            client,
            packman,
            discount,
            payment,
            debt,
            products: saleproducts,
          },
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
  }, [
    request,
    notify,
    auth,
    client,
    debt,
    discount,
    saleconnectorid,
    saleproducts,
    packman,
    payment,
  ]);

  const getTemporarys = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/temporary/get`,
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
    setVisibleTemporary(false);
    setSellingCard(true);
    setSaleConnectorId(e.temporary.saleconnectorid);
    setClient(e.temporary.client ? e.temporary.client : {});
    setDebt(e.temporary.debt);
    setDiscount(e.temporary.discount);
    setPayment(e.temporary.payment);
    setSaleProducts(e.temporary.products);
    setCurrentTemporary(e);
    setTotalPrice(
      e.temporary.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0)
    );
    setTotalPriceUzs(
      e.temporary.products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0)
    );
  };
  const [delTemporary, setDelTemporary] = useState({});

  const deleteTemporary = (e) => {
    setDelTemporary(e);
    setModal8(true);
  };

  const confirmDeleteTemporary = () => {
    deleteTemporarys(delTemporary._id);
    setModal8(false);
    notify({
      title: t("Saqlangan sotuv amaliyoti muvaffaqqiyatli o'chirildi"),
      status: 'success',
    });
  };

  //CURRENCY
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
  // UseEffect
  const [n, setN] = useState();
  useEffect(() => {
    getSaleConnectors();
  }, [currentPage, getSaleConnectors, countPage]);

  useEffect(() => {
    if (!n) {
      setN(1);
      getPackmans();
      getClients();
      getExchangerate();
      getProducts();
    }
  }, [
    getPackmans,
    getClients,
    getProducts,
    n,
    getExchangerate,
    getSaleConnectors,
  ]);
  //====================================================================
  //====================================================================
  return (
    <div className='m-3'>
      <div className={`${checkTemporary ? '' : 'hidden'}`}>
        <TemporayCheque
          sales={temporary}
          client={client}
          setCheck={setCheckTemporary}
        />
      </div>

      <div className={`${check ? '' : 'hidden'}`}>
        <Cheque sales={sales} setCheck={setCheck} currency={currency} />
      </div>
      <div className={`${checkConnectors ? '' : 'hidden'}`}>
        <ChequeConnectors
          currency={currency}
          sales={allSales}
          setCheck={setCheckConnectors}
        />
      </div>
      <div className={visible ? '' : 'hidden'}>
        <Card
          paymentComment={paymentComment}
          totalpriceuzs={totalpriceuzs}
          client={client}
          exchangerate={exchangerate}
          checkNumber={saleCounts}
          checkHandler={checkHandler}
          discount={discount}
          changeProcient={changeProcient}
          changeHandler={changeHandler}
          paymentType={paymentType}
          typeHandler={typeHandler}
          totalprice={totalprice}
          visible={visible}
          setVisible={setVisible}
          payment={payment}
          debt={debt}
        />
      </div>
      <div className={visibleEdit ? '' : 'hidden'}>
        <CardEdit
          editPaymentComment={editPaymentComment}
          totalpriceuzs={totalpriceuzs}
          client={client}
          exchangerate={exchangerate}
          checkNumber={saleCounts}
          checkHandler={checkHandlerEdit}
          discount={editDiscounts}
          changeHandler={changeHandlerEdit}
          paymentType={paymentTypeEdit}
          typeHandler={typeHandlerEdit}
          totalprice={totalprice}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          payment={paymentEdit}
          debt={debt}
        />
      </div>
      <div className={prePaymentVisible ? '' : 'hidden'}>
        <PrePaymentCard
          prePaymentComment={prePaymentComment}
          checkHandler={checkPrePayment}
          changeHandler={changeHandlerPrePayment}
          debt={prePaymentDebt}
          typeHandler={typeHandlerPrePayment}
          exchangerate={exchangerate}
          payment={prePayment}
          paymentType={prePaymentType}
          totalprice={prePaymentTotalPrice}
          totalpriceuzs={prePaymentTotalPriceUzs}
          prePaymentSaleConnector={prePaymentSaleConnector}
          prePayment={prePayment}
          setVisible={setPrePaymentVisible}
        />
      </div>

      <RouterBtns
        currency={currency}
        changeCurrency={changeCurrency}
        changeVisibleTemporary={changeVisibleTemporary}
        changeSellingCard={changeSellingCard}
        changeSellingEditCard={changeSellingEditCard}
        changeTableCard={changeTableCard}
      />
      <div className={`${visibleTemporary ? '' : 'hidden'}`}>
        <Temporaries
          deleteTemporary={deleteTemporary}
          temporarys={temporarys}
          changeTemporary={changeTemporary}
        />
      </div>
      <div className={sellingCard ? ' ' : 'hidden'}>
        <Products changeProduct={changeProduct} products={products} />
        <Selling
          currency={currency}
          saveTemporary={saveTemporary}
          saleconnectorid={saleconnectorid}
          totalpriceuzs={totalpriceuzs}
          checkNumber={saleCounts}
          payment={payment}
          discount={discount}
          debt={debt}
          totalprice={totalprice}
          setVisible={saleHandler}
          editProducts={editProducts}
          saleproducts={saleproducts}
          client={client}
          packmans={packmans}
          clients={clients}
          changePackman={changePackman}
          changeClient={changeClient}
          inputClient={inputClient}
        />
      </div>

      <Sales
        currency={currency}
        keyPressed={searchKeypress}
        changeSearch={changeSearch}
        getSaleConnectorsExcel={getSaleConnectorsExcel}
        changePrepayment={changePrepayment}
        changeDate={changeDate}
        startDate={startDate}
        endDate={endDate}
        tableCard={tableCard}
        Clear={Clear}
        editHandler={editHandler}
        currentPage={currentPage}
        addProducts={addProducts}
        saleCounts={saleCounts}
        setCurrentProducts={setCurrentProducts}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        countPage={countPage}
        currentProducts={currentProducts}
        saleconnectors={saleconnectors}
        changeCheck={changeCheck}
      />
      <ExcelTable saleconnectors={excelTable} />

      <EditSelling
        currency={currency}
        sellingEditCard={sellingEditCard}
        changeBack={changeBack}
        editSaleConnector={editSaleConnector}
        checkNumber={saleCounts}
        payment={editPayments}
        discount={editDiscounts}
        debt={debt}
        totalprice={editTotalPrice}
        totalpriceuzs={editTotalPriceUzs}
        setVisible={setVisibleEdit}
        editProducts={editProducts}
        saleproducts={editSaleProducts}
        packmans={packmans}
        clients={clients}
        changePackman={changePackman}
        changeClient={changeClient}
        inputClient={inputClient}
      />

      <Modal
        loading={loading}
        modal={modal}
        setModal={setModal}
        basic={
          <InputProduct
            currency={currency}
            setCounts={setCounts}
            product={saleproduct}
            changeEnter={changeEnter}
          />
        }
        // text={"mahsulotnti o'chirishni tasdiqlaysizmi?"}
        handler={pushSaleProduct}
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        basic={`${t('Diqqat! Iltimos')} ${debt.debt.toLocaleString(
          'ru-RU'
        )}$ (${(debt.debt * exchangerate.exchangerate).toLocaleString(
          'ru-RU'
        )} ${t("so'm)  qarzdorlik uchun izoh kiriting")}`}
        text={
          <input
            onChange={changeComment}
            className='block border w-full px-2 rounded'
            placeholder={t('Izoh')}
          />
        }
        handler={saleconnectorid ? addHandler : createHandler}
      />

      <Modal
        modal={modal3}
        setModal={setModal3}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={saleconnectorid ? addHandler : createHandler}
      />

      <Modal
        modal={modal4}
        setModal={setModal4}
        basic={`${t('Diqqat! Iltimos')} ${debt.debt.toLocaleString(
          'ru-RU'
        )}$ (${(debt.debt * editExchanrate.exchangerate).toLocaleString(
          'ru-RU'
        )} ${t("so'm)  qarzdorlik uchun izoh kiriting")}`}
        text={
          <input
            onChange={changeComment}
            className='block border w-full px-2 rounded'
            placeholder={t('Izoh')}
          />
        }
        handler={createHandlerEdit}
      />

      <Modal
        modal={modal5}
        setModal={setModal5}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={createHandlerEdit}
      />

      <Modal
        modal={modal6}
        setModal={setModal6}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={createHandlerPrePayment}
      />

      <Modal
        modal={modal7}
        setModal={setModal7}
        handler={confirmSaveTemporary}
        basic={t('Mijoz uchun sotuvni vaqtincha saqlashni tasdiqlaysizmi?')}
      />
      <Modal
        modal={modal8}
        setModal={setModal8}
        handler={confirmDeleteTemporary}
        basic={t("Diqqat! Saqlangan sotuvni o'chirishni tasdiqlaysizmi?")}
      />
    </div>
  );
};
