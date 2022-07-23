import { useToast } from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './ProfitTable/TableHead';
import { TableHeader } from './ProfitTable/TableHeader';
import { TableRow } from './ProfitTable/TableRow';

export const Profit = ({ beginDay, endDay, currency }) => {
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

  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();

  const [startDate, setStartDate] = useState(beginDay);
  const [endDate, setEndDate] = useState(endDay);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [profitData, setProfitData] = useState([]);
  const [profitCount, setProfitCount] = useState(0);

  const getProfit = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/profitdata',
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
      setProfitData(data.profitData);
      setProfitCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [notify, auth, request, currentPage, countPage, startDate, endDate]);

  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };

  const changeDate = (e) => {
    e.target.name === 'startDate'
      ? setStartDate(
          new Date(
            new Date(e.target.value).setUTCHours(0, 0, 0, 0)
          ).toISOString()
        )
      : setEndDate(new Date(e.target.value).toISOString());
  };
  console.log(profitData);
  useEffect(() => {
    getProfit();
  }, [getProfit, currentPage, countPage, startDate, endDate]);

  return (
    <>
      <div className=''>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          currentPage={currentPage}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          paymentsCount={profitCount}
          countPage={countPage}
          loading={loading}
        />
        <TableHead
          currentPayments={profitData}
          setCurrentPayments={setProfitData}
        />
        {profitData.length > 0 &&
          profitData.map((profit, index) => {
            return (
              <TableRow
                currency={currency}
                profit={profit}
                currentPage={currentPage}
                index={index}
                key={index}
              />
            );
          })}
        <ul className='tr font-bold text-base'>
          <li className='td col-span-4 text-right border-r'>{t('Jami')}</li>
          <li className='td text-right col-span-2 border-r-2 border-orange-800'>
            {currency === 'UZS'
              ? (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.totalincomingpriceuzs,
                      0
                    ) * 1
                  ) / 1
                ).toLocaleString('ru-RU')
              : (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.totalincomingprice,
                      0
                    ) * 1000
                  ) / 1000
                ).toLocaleString('ru-RU')}{' '}
            <span className='text-blue-800'>{currency}</span>
          </li>
          <li className='td text-right col-span-2 border-r-2 border-orange-800'>
            {currency === 'UZS'
              ? (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.totalsellingpriceuzs,
                      0
                    ) * 1
                  ) / 1
                ).toLocaleString('ru-RU')
              : (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.totalsellingprice,
                      0
                    ) * 1000
                  ) / 1000
                ).toLocaleString('ru-RU')}{' '}
            <span className='text-blue-800'>{currency}</span>
          </li>
          <li className='td text-right col-span-2 border-r-2 border-red-600'>
            {currency === 'UZS'
              ? (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.discountuzs,
                      0
                    ) * 1
                  ) / 1
                ).toLocaleString('ru-RU')
              : (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.discount,
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
                    profitData.reduce(
                      (summ, profit) => summ + profit.profituzs,
                      0
                    ) * 1
                  ) / 1
                ).toLocaleString('ru-RU')
              : (
                  Math.round(
                    profitData.reduce(
                      (summ, profit) => summ + profit.profit,
                      0
                    ) * 1000
                  ) / 1000
                ).toLocaleString('ru-RU')}{' '}
            <span className='text-blue-800'>{currency}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
