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
import { faPrint, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { PrintReport } from './PrintReport';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Debts } from '../sale/Debts';
import { Discounts } from '../sale/Discounts';
import { Payments } from '../sale/Payments';
import { PaymentsReport } from './PaymentsReport';
import { Loader } from '../../../loader/Loader';

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
    new Date(new Date().setUTCMonth(new Date().getMonth() - 1)).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  //========================================================
  //========================================================

  const [isPrint, setIsPrint] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  //========================================================
  //========================================================

  const [salesReport, setSalesReport] = useState({
    totalpayments: 0,
    totalcash: 0,
    totalcard: 0,
    totaltransfer: 0,
    salescount: 0,
  });

  const [productsReport, setProductsReport] = useState({
    productscount: 0,
    totalprice: 0,
    totalproducts: 0,
  });

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
  });

  const [discountsReport, setDiscountsReport] = useState({
    discountcount: 0,
    discounttotal: 0,
  });

  const getDebtAndDiscountReports = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/debtdiscount',
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
      setDiscountsReport({
        discountcount: data.discountcount,
        discounttotal: data.discounttotal,
      });
      setDebtsReport({
        debtcount: data.debtcount,
        debttotal: data.debttotal,
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

  useEffect(() => {
    getBaseUrl();
  }, [getBaseUrl]);

  //========================================================
  //========================================================

  const changeDate = (e) => {
    e.target.name === 'startDate'
      ? setStartDate(
          new Date(
            new Date(e.target.value).setUTCHours(0, 0, 0, 0)
          ).toISOString()
        )
      : setEndDate(new Date(e.target.value).toISOString());
  };

  //========================================================
  //========================================================

  useEffect(() => {
    getSalesReport();
    getProductReport();
    getIncomingsReport();
    getDebtAndDiscountReports();
  }, [
    getSalesReport,
    getProductReport,
    getIncomingsReport,
    getDebtAndDiscountReports,
    startDate,
    endDate,
  ]);

  //========================================================
  //========================================================

  const componentRef = useRef();

  const print = () => {
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //========================================================
  //========================================================

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='m-3 p-4'>
      <div className='grid grid-cols-12 px-20 mb-10'>
        <div className='col-span-3 flex justify-between'>
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
        <div className='col-end-13 col-span-3 text-right'>
          <button
            className='bg-blue-700 hover:bg-blue-800 text-white m-auto px-10 py-1 text-lg rounded mr-4'
            onClick={() => setIsPrint(true)}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-12 w-full mb-8 gap-4'>
        <div className='col-span-4 flex flex-column justify-between gap-y-3'>
          <Link
            to='/alo24/reports/debts'
            onClick={() => window.scroll(0, 500)}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
              Долги
            </p>
            <p className='text-white font-bold text-xl pointer-events-none	'>
              {debtsReport.debtcount} {'-'}{' '}
              {debtsReport.debttotal &&
                debtsReport.debttotal.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
          <Link
            to='/alo24/reports/discounts'
            onClick={() => window.scroll(0, 500)}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
              Скидки
            </p>
            <p className='text-white font-bold text-xl pointer-events-none'>
              {discountsReport.discountcount} {'-'}{' '}
              {discountsReport.discounttotal &&
                discountsReport.discounttotal.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
          <Link
            to='/alo24/reports/discounts'
            onClick={() => window.scroll(0, 500)}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
              Расход
            </p>
            <p className='text-white font-bold text-xl pointer-events-none'>
              {discountsReport.discountcount} {'-'}{' '}
              {discountsReport.discounttotal &&
                discountsReport.discounttotal.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
        </div>
        <div className='col-start-5 col-span-4 border-2 border-blue-700 p-4 flex flex-column items-center rounded-lg'>
          <p className='text-xl font-bold text-black mb-4'>
            Общая сумма продаж
          </p>
          <span className='text-3xl font-bold text-black'>
            {salesReport.salescount}
          </span>
          <p className='text-base font-medium mb-4'>Количество</p>
          <span className='text-3xl font-bold text-black'>
            {(Math.round(salesReport.totalpayments * 100) / 100).toLocaleString(
              'ru-RU'
            )}{' '}
            $
          </span>
          <p className='text-base font-medium mb-4'>Сумма</p>
          <Link
            to='/alo24/reports/payments'
            onClick={() => window.scroll(0, 500)}
            className='px-4 py-2 bg-blue-700 text-base text-white flex justify-around items-center'
          >
            <p className='mr-2'>Подробно</p>
            <FontAwesomeIcon icon={faCircleInfo} />
          </Link>
        </div>
        <div className='col-span-4 flex flex-column justify-between gap-y-3'>
          <Link
            to='/alo24/reports/paymentstypes'
            onClick={() => {
              setPaymentType('cash');
              window.scroll(0, 500);
            }}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none'>
              Наличными
            </p>
            <p className='text-white font-bold text-xl pointer-events-none	'>
              {salesReport.cashcount} {'-'}{' '}
              {salesReport.totalcash &&
                salesReport.totalcash.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
          <Link
            to='/alo24/reports/paymentstypes'
            onClick={() => {
              setPaymentType('card');
              window.scroll(0, 500);
            }}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
              По карте
            </p>
            <p className='text-white font-bold text-xl pointer-events-none	'>
              {salesReport.cardcount} {'-'}{' '}
              {salesReport.totalcard &&
                salesReport.totalcard.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
          <Link
            to='/alo24/reports/paymentstypes'
            onClick={() => {
              setPaymentType('transfer');
              window.scroll(0, 500);
            }}
            className='w-full bg-blue-800 text-center py-4 rounded-xl transition ease-in-out hover:bg-blue-700'
          >
            <p className='text-white font-bold text-lg mb-2 pointer-events-none	'>
              Переводы
            </p>
            <p className='text-white font-bold text-xl pointer-events-none	'>
              {salesReport.transfercount} {'-'}{' '}
              {salesReport.totaltransfer &&
                salesReport.totaltransfer.toLocaleString('ru-RU')}{' '}
              $
            </p>
          </Link>
        </div>
      </div>

      <Switch>
        <Route path='/alo24/reports/debts'>
          <Debts />
        </Route>
        <Route path='/alo24/reports/discounts'>
          <Discounts />
        </Route>
        <Route path='/alo24/reports/payments'>
          <Payments />
        </Route>
        <Route path='/alo24/reports/paymentstypes'>
          <PaymentsReport type={paymentType} />
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
        />
      </div>
    </div>
  );
};
