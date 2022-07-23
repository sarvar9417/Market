import { useToast } from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Rows } from './Sales/Rows';
import { TableHead } from './Sales/TableHead';
import { TableHeader } from './Sales/TableHeader';

export const Sales = ({ beginDay, endDay, currency }) => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);


  const [startDate, setStartDate] = useState(beginDay);
  const [endDate, setEndDate] = useState(endDay);

  const [salesCount, setSalesCount] = useState(0);
  const [sales, setSales] = useState([]);
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

  const getSales = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/getsales',
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSales(data.sales);
      setSalesCount(data.salesCount);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currentPage, countPage, startDate, endDate]);

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };
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

  useEffect(() => {
    getSales();
  }, [getSales]);
  return (
    <div>
      <TableHeader
        salesCount={salesCount}
        changeDate={changeDate}
        currentPage={currentPage}
        countPage={countPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        startDate={startDate}
        endDate={endDate}
      />
      <TableHead sales={sales} setSales={setSales} />
      {sales.map((sale, index) => (
        <Rows
          index={index}
          key={sale._id}
          sale={sale}
          currentPage={currentPage}
          currency={currency}
        />
      ))}
      <ul className='tr font-bold text-base'>
        <li className='td col-span-4 text-right border-r'>{t('Jami')}</li>
        <li className='td text-right col-span-2 border-r-2 border-blue-800'>
          {currency === 'UZS'
            ? (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.products.reduce(
                        (summ, product) => summ + product.totalpriceuzs,
                        0
                      ),
                    0
                  ) * 1
                ) / 1
              ).toLocaleString('ru-RU')
            : (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.products.reduce(
                        (summ, product) => summ + product.totalprice,
                        0
                      ),
                    0
                  ) * 1000
                ) / 1000
              ).toLocaleString('ru-RU')}{' '}
          <span className='text-blue-800'>{currency}</span>
        </li>
        <li className='td text-right col-span-2 border-r-2 border-green-800'>
          {currency === 'UZS'
            ? (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.cashuzs,
                        0
                      ),
                    0
                  ) * 1
                ) / 1
              ).toLocaleString('ru-RU')
            : (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.cash,
                        0
                      ),
                    0
                  ) * 1000
                ) / 1000
              ).toLocaleString('ru-RU')}{' '}
          <span className='text-green-800'>{currency}</span>
        </li>
        <li className='td text-right col-span-2 border-r-2 border-orange-600'>
          {currency === 'UZS'
            ? (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.carduzs,
                        0
                      ),
                    0
                  ) * 1
                ) / 1
              ).toLocaleString('ru-RU')
            : (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.card,
                        0
                      ),
                    0
                  ) * 1000
                ) / 1000
              ).toLocaleString('ru-RU')}{' '}
          <span className='text-orange-600'>{currency}</span>
        </li>
        <li className='td text-right col-span-2 border-r-2 border-red-600'>
          {currency === 'UZS'
            ? (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.transferuzs,
                        0
                      ),
                    0
                  ) * 1
                ) / 1
              ).toLocaleString('ru-RU')
            : (
                Math.round(
                  sales.reduce(
                    (summ, sale) =>
                      summ +
                      sale.payments.reduce(
                        (summ, payment) => summ + payment.transfer,
                        0
                      ),
                    0
                  ) * 1000
                ) / 1000
              ).toLocaleString('ru-RU')}{' '}
          <span className='text-red-600'>{currency}</span>
        </li>
      </ul>
    </div>
  );
};
