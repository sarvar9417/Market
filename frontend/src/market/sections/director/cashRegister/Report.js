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
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export const Report = () => {
  //========================================================
  //========================================================

  const auth = useContext(AuthContext);
  const { request } = useHttp();

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

  const [salesReport, setSalesReport] = useState({});
  const [productsReport, setProductsReport] = useState({});
  const [incomingsReport, setIncomingsReport] = useState({});

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
        '/api/reports/product',
        'POST',
        {
          market: auth && auth.market._id,
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
  }, [
    getSalesReport,
    getProductReport,
    getIncomingsReport,
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
            onClick={print}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
      <div className='a4 m-auto w-[27cm] p-4' ref={componentRef}>
        <div className='w-full flex justify-between items-center px-6'>
          <div className='text-blue-700 text-center'>
            <div className='font-serif text-4xl font-bold'>ОТЧЕТ</div>
            <div className='font-medium text-2xl'>
              {new Date(startDate).toLocaleDateString()} -{' '}
              {new Date(endDate).toLocaleDateString()}
            </div>
          </div>
          <div className='flex justify-center items-center gap-4 mb-4'>
            <img
              src={
                baseUrl &&
                `${baseUrl}/api/upload/file/${auth && auth.market.image}`
              }
              alt='market'
            />
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-8'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {salesReport.salescount || 0}
            </span>
            <p className='text-xl font-medium'>Количество продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-black'>
              {String(salesReport.totalpayments) || 0} $
            </span>
            <p className='text-xl font-medium'>Общая сумма продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-2xl font-bold text-red-400 '>{123456} $</span>
            <p className='text-xl font-medium'>Общая сумма расходов</p>
          </div>
        </div>
        <div className='grid grid-cols-12 mb-12'>
          <div className='col-span-7'>
            <table className='table-auto border-2 border-blue-700 w-full'>
              <thead>
                <tr>
                  <th className='border-2 border-blue-700 py-2 px-4'>
                    Количество продаж
                  </th>
                  <th className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.salescount || 0}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    Наличнами
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {parseFloat(salesReport.totalpayments) || 0} $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    По карте
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totalcard || 0} $
                  </td>
                </tr>
                <tr>
                  <td className='border-2 border-blue-700 py-2 px-4 text-lg font-bold'>
                    Перевод
                  </td>
                  <td className='border-2 border-blue-700 py-2 px-2 text-right text-base font-medium'>
                    {salesReport.totaltransfer || 0} $
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-span-5 flex flex-col items-center justify-center'>
            <span className='text-4xl font-bold text-green-500'>44 000 $</span>
            <p className='text-2xl font-medium text-blue-700'>Чистая прибыль</p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {salesReport.salescount || 0}
            </span>
            <p className='text-lg font-medium'>Количество продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.productscount || 0}{' '}
            </span>
            <p className='text-lg font-medium'>Общее количество товаров</p>
          </div>
          <div className='col-span-4 flex flex-col items-center text-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.totalproducts || 0}
            </span>
            <p className='text-lg font-medium'>
              Общее количество видов товаров
            </p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {incomingsReport.incomingsCount || 0}
            </span>
            <p className='text-lg font-medium'>Количество Приходов</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {parseFloat(salesReport.totalpayments) || 0} $
            </span>
            <p className='text-lg font-medium'>Общая сумма продаж</p>
          </div>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>{123456} $</span>
            <p className='text-lg font-medium'>Общая сумма расходов</p>
          </div>
        </div>
        <div className='grid grid-cols-12 border-2 border-blue-700 py-4 mb-6 px-2'>
          <div className='col-span-4 flex flex-col items-center'>
            <span className='text-xl font-bold text-black'>
              {incomingsReport.totalIncomingsPrice || 0} $
            </span>
            <p className='text-lg font-medium'>Общая сумма Приходов</p>
          </div>
          <div className='col-start-9 col-span-4 flex flex-col items-center text-center'>
            <span className='text-xl font-bold text-black'>
              {productsReport.totalprice || 0} $
            </span>
            <p className='text-lg font-medium'>Общая сумма товаров на складе</p>
          </div>
        </div>
      </div>
    </div>
  );
};
