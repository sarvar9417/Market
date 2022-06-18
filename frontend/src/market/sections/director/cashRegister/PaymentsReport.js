import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './PaymentsReport/TableHead';
import { TableHeader } from './PaymentsReport/TableHeader';
import { Rows } from './PaymentsReport/Rows';
import { ExcelTable } from './PaymentsReport/ExcelTable';

export const PaymentsReport = ({ type }) => {
  // STATES
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [currentPayments, setCurrentPayments] = useState([]);
  const [paymentsCount, setPaymentsCount] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [totalPayments, setTotalPayments] = useState(0);
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

  // GETDATA
  const getPayments = useCallback(async () => {
    try {
      const data = await request(
        '/api/reports/getpayments',
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          type,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTotalPayments(data.totalpayments);
      setPaymentsCount(data.paymentsCount);
      setCurrentPayments(data.payments);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify, currentPage, countPage, startDate, endDate, type]);

  const getPaymentsExcel = async () => {
    try {
      const data = await request(
        '/api/reports/getpaymentexcel',
        'POST',
        {
          market: auth.market._id,
          type,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTableExcel(data);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

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
    getPayments();
  }, [getPayments, currentPage, countPage, startDate, endDate, type]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[990px]'>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          getPaymentsExcel={getPaymentsExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          paymentsCount={paymentsCount}
          countPage={countPage}
        />
        <TableHead
          currentPayments={currentPayments}
          setCurrentPayments={setCurrentPayments}
          type={type}
        />
        {currentPayments.map((payment, index) => {
          return (
            <Rows
              key={index}
              index={index}
              payment={payment}
              currentPage={currentPage}
              type={type}
            />
          );
        })}

        <ul className='tr font-bold text-base'>
          <li className='td col-span-9 text-right border-r'>Jami</li>
          <li className='td text-right col-span-3 border-r-2 border-orange-600'>
            {(Math.round(totalPayments * 100) / 100).toLocaleString('de-DE')}{' '}
            <span className='text-orange-600'>USD</span>
          </li>
        </ul>
      </div>

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
