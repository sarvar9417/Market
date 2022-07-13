import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './ProfitTable/TableHead';
import { TableHeader } from './ProfitTable/TableHeader';
import { TableRow } from './ProfitTable/TableRow';

export const Profit = () => {
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

  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();

  //========================================================
  //========================================================

  //========================================================
  //========================================================

  const [startDate, setStartDate] = useState(
    new Date(new Date().setUTCMonth(new Date().getMonth() - 1)).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  //========================================================
  //========================================================

  //========================================================
  //========================================================

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

  //========================================================
  //========================================================

  //========================================================
  //========================================================

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

  //========================================================
  //========================================================

  //========================================================
  //========================================================

  useEffect(() => {
    getProfit();
  }, [getProfit, currentPage, countPage, startDate, endDate]);

  return (
    <>
      <div className='m-3 p-4'>
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
                profit={profit}
                currentPage={currentPage}
                index={index}
                key={index}
              />
            );
          })}
      </div>
    </>
  );
};
