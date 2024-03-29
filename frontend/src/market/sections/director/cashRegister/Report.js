import { useToast } from '@chakra-ui/react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentsDollar,
  faCreditCard,
  faHandHoldingDollar,
  faInfo,
  faMoneyBill,
  faMoneyBillTransfer,
  faPrint,
  faRotate,
  faTags,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { PrintReport } from './PrintReport';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Discounts } from '../sale/Discounts';
import { Loader } from '../../../loader/Loader';
import { DebtsReport } from './DebtsReport';
import { ChequeConnectors } from '../sale/Sales/ChequeConnectors';
import { ReturnedProducts } from './ReturnedProducts';
import { t } from 'i18next';
import { Expense } from './Expense';
import { Profit } from './Profit';
import { Currency } from '../components/Currency';
import { Sales } from './Sales';
import { Payments } from './Payments';

export const Report = () => {
  //========================================================
  //========================================================

  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();

  //========================================================
  //========================================================

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

  //========================================================
  //========================================================

  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toISOString()
  );

  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  //========================================================
  //========================================================

  const [isPrint, setIsPrint] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  //========================================================
  //========================================================

  //========================================================
  //========================================================

  const [checkConnectors, setCheckConnectors] = useState(false);
  const [checkSales, setCheckSales] = useState({
    products: [],
    payments: [],
    debts: [],
    discounts: [],
    user: [],
  });

  //========================================================
  //========================================================

  const [salesReport, setSalesReport] = useState({
    totalpayments: 0,
    totalcash: 0,
    totalcard: 0,
    totaltransfer: 0,
    salescount: 0,
    cashexpense: 0,
    cardexpense: 0,
    transferexpense: 0,
  });

  const [productsReport, setProductsReport] = useState({});

  const [incomingsReport, setIncomingsReport] = useState({
    incomingsCount: 0,
    totalIncomingsPrice: 0,
  });

  const getSalesReport = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/sales',
        'POST',
        {
          market: auth.market && auth.market._id,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSalesReport(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, startDate, endDate]);

  const getProductReport = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/products',
        'POST',
        {
          market: auth.market._id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProductsReport(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);

  const getIncomingsReport = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/incomings',
        'POST',
        {
          market: auth.market && auth.market._id,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      setIncomingsReport(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, startDate, endDate]);

  //========================================================
  //========================================================

  const [debtsReport, setDebtsReport] = useState({
    debtcount: 0,
    debttotal: 0,
    debttotaluzs: 0,
  });

  const [discountsReport, setDiscountsReport] = useState({
    discountcount: 0,
    discounttotal: 0,
    discounttotaluzs: 0,
  });

  const getDebtAndDiscountReports = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/debtdiscount',
        'POST',
        {
          market: auth.market._id,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setDiscountsReport({
        discountcount: data.discountcount,
        discounttotal: data.discounttotal,
        discounttotaluzs: data.discounttotaluzs,
      });
      setDebtsReport({
        debtcount: data.debtcount,
        debttotal: data.debttotal,
        debttotaluzs: data.debttotaluzs,
      });
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, startDate, endDate]);

  //========================================================
  //========================================================

  const [baseUrl, setBaseUrl] = useState();

  const getBaseUrl = useCallback(async () => {
    try {
      const data = await request('/api/baseurl', 'GET', null);
      setBaseUrl(data.baseUrl);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, notify]);

  //========================================================
  //========================================================

  const [profit, setProfit] = useState({ income: 0, incomeuzs: 0 });

  const getNetProfit = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/profit',
        'POST',
        {
          market: auth.market._id,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setProfit(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, notify, request, startDate, endDate]);

  //========================================================
  //========================================================

  //========================================================
  //========================================================

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

  const changeCheck = (e) => {
    setCheckSales(e);
    setCheckConnectors(true);
    window.scroll({ top: 0 });
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

  //========================================================
  //========================================================

  useEffect(() => {
    getSalesReport();
    getProductReport();
    getIncomingsReport();
    getDebtAndDiscountReports();
    getNetProfit();
  }, [
    getSalesReport,
    getProductReport,
    getIncomingsReport,
    getDebtAndDiscountReports,
    getNetProfit,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    getBaseUrl();
    getCurrency();
  }, [getBaseUrl, getCurrency]);

  const componentRef = useRef();

  const print = () => {
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='m-3 p-4'>
      <div className='grid grid-cols-12 px-5 mb-5'>
        <div className='col-span-4 flex items-center'>
          <div className='font-bold'>
            Asosiy valyuta turi:{' '}
            <Currency
              value={currency === 'UZS' ? true : false}
              onToggle={changeCurrency}
            />
          </div>
        </div>
        <div className='col-span-4 flex justify-between'>
          <input
            onChange={changeDate}
            defaultValue={new Date(startDate).toISOString().slice(0, 10)}
            type='date'
            name='startDate'
            className='border rounded p-1 focus:outline-green-800'
          />
          <input
            onChange={changeDate}
            defaultValue={new Date(endDate).toISOString().slice(0, 10)}
            type='date'
            name='endDate'
            className='border rounded p-1 focus:outline-green-800 ml-2'
          />
        </div>
        <div className=' col-span-4 text-right'>
          <button
            className='bg-blue-700 hover:bg-blue-800 text-white m-auto px-10 py-1 text-lg rounded mr-4'
            onClick={() => setIsPrint(true)}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-12 w-full mb-8 gap-4'>
        <Link
          to='/alo24/reports/debts'
          onClick={() => {
            window.scroll(0, 500);
            setPaymentType('debts');
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon
              icon={faHandHoldingDollar}
              color='white'
              fontSize={'24px'}
            />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
            {t('Qarzlar')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none	'>
            {debtsReport.debtcount} {'-'}{' '}
            {debtsReport.debttotal &&
              (currency === 'UZS'
                ? debtsReport.debttotaluzs.toLocaleString('ru-RU')
                : debtsReport.debttotal.toLocaleString('ru-RU'))}{' '}
            {currency}
          </p>
        </Link>
        <Link
          to='/alo24/reports/sales'
          onClick={() => {
            setPaymentType('allpayments');
            window.scroll(0, 500);
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon icon={faInfo} color='white' fontSize={'24px'} />
          </span>
          <p className='text-lg font-bold text-white mb-2'>
            {t('Umumiy savdo summasi')}
          </p>
          <div className='mb-2'>
            <span className='text-xl font-bold text-white'>
              {salesReport.salecount} -{' '}
            </span>
            <span className='text-xl font-bold text-white'>
              {currency === 'UZS'
                ? (Math.round(salesReport.totalsaleuzs * 1) / 1).toLocaleString(
                    'ru-RU'
                  )
                : (
                    Math.round(salesReport.totalsale * 1000) / 1000
                  ).toLocaleString('ru-RU')}{' '}
              {currency}
            </span>
          </div>
        </Link>
        <Link
          to='/alo24/reports/paymentstypes'
          onClick={() => {
            setPaymentType('cash');
            window.scroll(0, 500);
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon
              icon={faMoneyBill}
              color='white'
              fontSize={'24px'}
            />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
            {t('Naqd')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none	'>
            {salesReport.cashcount} {'-'}{' '}
            {salesReport.totalcash &&
              (currency === 'UZS'
                ? salesReport.totalcashuzs.toLocaleString('ru-RU')
                : salesReport.totalcash.toLocaleString('ru-RU'))}{' '}
            {currency}
          </p>
          {/* <p className='font-bold text-base pointer-events-none text-red-700'>
            -{salesReport.cashexpense.toLocaleString('ru-RU')} {currency}
          </p> */}
        </Link>
        <Link
          to='/alo24/reports/discounts'
          onClick={() => window.scroll(0, 500)}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon icon={faTags} color='white' fontSize={'24px'} />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
            {t('Chegirmalar')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none'>
            {discountsReport.discountcount} {'-'}{' '}
            {discountsReport.discounttotal &&
              (currency === 'UZS'
                ? discountsReport.discounttotaluzs.toLocaleString('ru-RU')
                : discountsReport.discounttotal.toLocaleString('ru-RU'))}{' '}
            {currency}
          </p>
        </Link>
        <Link
          to='/alo24/reports/profit'
          onClick={() => {
            setPaymentType('allpayments');
            window.scroll(0, 500);
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon icon={faWallet} color='white' fontSize={'24px'} />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
            {t('Sof foyda')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none	'>
            {currency === 'UZS'
              ? profit.incomeuzs.toLocaleString('ru-RU')
              : profit.income.toLocaleString('ru-RU')}{' '}
            {currency}
          </p>
        </Link>
        <Link
          to='/alo24/reports/paymentstypes'
          onClick={() => {
            setPaymentType('card');
            window.scroll(0, 500);
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon
              icon={faCreditCard}
              color='white'
              fontSize={'24px'}
            />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
            {t('Plastik')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none	'>
            {salesReport.cardcount} {'-'}{' '}
            {salesReport.totalcard &&
              (currency === 'UZS'
                ? salesReport.totalcarduzs.toLocaleString('ru-RU')
                : salesReport.totalcard.toLocaleString('ru-RU'))}{' '}
            {currency}
          </p>
          {/* <p className='text-red-700 font-bold text-base pointer-events-none'>
            -{salesReport.cardexpense.toLocaleString('ru-RU')} {currency}
          </p> */}
        </Link>
        <Link
          to='/alo24/reports/expense'
          onClick={() => window.scroll(0, 500)}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon
              icon={faCommentsDollar}
              color='white'
              fontSize={'24px'}
            />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
            {t('Xarajatlar')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none'>
            {(
              salesReport.cashexpense +
              salesReport.cardexpense +
              salesReport.transferexpense
            ).toLocaleString('ru-RU')}{' '}
            {currency}
          </p>
        </Link>
        <Link
          to={'/alo24/reports/returnproducts'}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl flex justify-center items-center transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon icon={faRotate} color='white' fontSize={'24px'} />
          </span>
          <p className='text-white font-bold text-center text-lg mb-2 pointer-events-none	'>
            {t('Qaytarilganlar')}
          </p>
        </Link>
        <Link
          to='/alo24/reports/paymentstypes'
          onClick={() => {
            setPaymentType('transfer');
            window.scroll(0, 500);
          }}
          className='col-span-4 bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700 relative'
        >
          <span className='absolute top-4 left-4'>
            <FontAwesomeIcon
              icon={faMoneyBillTransfer}
              color='white'
              fontSize={'24px'}
            />
          </span>
          <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
            {t('Otkazmalar')}
          </p>
          <p className='text-white font-bold text-xl pointer-events-none	'>
            {salesReport.transfercount} {'-'}{' '}
            {salesReport.totaltransfer &&
              (currency === 'UZS'
                ? salesReport.totaltransferuzs.toLocaleString('ru-RU')
                : salesReport.totaltransfer.toLocaleString('ru-RU'))}{' '}
            {currency}
          </p>
          {/* <p className='text-red-700 font-bold text-base pointer-events-none'>
            {salesReport.transferexpense.toLocaleString('ru-RU')}
          </p> */}
        </Link>
      </div>

      <Switch>
        <Route path='/alo24/reports/debts'>
          <DebtsReport
            currency={currency}
            beginDay={startDate}
            endDay={endDate}
            getSalesReport={getSalesReport}
            getProductReport={getProductReport}
            getIncomingsReport={getIncomingsReport}
            getDebtAndDiscountReports={getDebtAndDiscountReports}
          />
        </Route>
        <Route path='/alo24/reports/discounts'>
          <Discounts
            currency={currency}
            beginDay={startDate}
            endDay={endDate}
          />
        </Route>
        <Route path='/alo24/reports/sales'>
          <Sales beginDay={startDate} endDay={endDate} currency={currency} />
        </Route>

        <Route path='/alo24/reports/paymentstypes'>
          <Payments
            beginDay={startDate}
            endDay={endDate}
            currency={currency}
            type={paymentType}
          />
        </Route>
        <Route path='/alo24/reports/profit'>
          <Profit beginDay={startDate} endDay={endDate} currency={currency} />
        </Route>
        <Route path='/alo24/reports/returnproducts'>
          <ReturnedProducts
            changeCheck={changeCheck}
            beginDay={startDate}
            endDay={endDate}
            currency={currency}
          />
        </Route>
        <Route path='/alo24/reports/expense'>
          <Expense changeAbleDelete={'delete'} />
        </Route>
        <Redirect to='/alo24/reports' />
      </Switch>

      <div
        className={`${
          isPrint ? 'fixed' : 'hidden'
        } top-0 left-0 w-full h-full z-10 bg-white overflow-auto pb-4`}
      >
        <PrintReport
          startDate={startDate}
          endDate={endDate}
          baseUrl={baseUrl}
          componentRef={componentRef}
          salesReport={salesReport}
          productsReport={productsReport}
          incomingsReport={incomingsReport}
          auth={auth}
          print={print}
          setIsPrint={setIsPrint}
          // profit={profit}
        />
      </div>

      <div className={`${checkConnectors ? '' : 'hidden'}`}>
        <ChequeConnectors sales={checkSales} setCheck={setCheckConnectors} />
      </div>
    </div>
  );
};
