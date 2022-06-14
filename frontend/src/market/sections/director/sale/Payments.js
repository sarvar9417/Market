import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Payment/TableHead';
import { TableHeader } from './Payment/TableHeader';
import { Rows } from './Payment/Rows';
import { ExcelTable } from './Payment/ExcelTable';
import { t } from 'i18next';

export const Payments = () => {
  // STATES
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [search, setSearch] = useState({ clientname: '' });
  const [sendingsearch, setSendingSearch] = useState({ clientname: '' });

  const [currentPayments, setCurrentPayments] = useState([]);
  const [paymentsCount, setPaymentsCount] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [totalPayments, setTotalPayments] = useState({
    cash: 0,
    card: 0,
    transfer: 0,
    cashuzs: 0,
    carduzs: 0,
    transferuzs: 0,
  });
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
        '/api/sales/payments/get',
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          search: sendingsearch,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCurrentPayments(data.payments);
      setSearchStorage(data.payments);
      setPaymentsCount(data.count);
      setTotalPayments(data.total);
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
    notify,
    currentPage,
    countPage,
    sendingsearch,
    startDate,
    endDate,
  ]);

  const getPaymentsExcel = async () => {
    try {
      const data = await request(
        '/api/sales/payments/getexcel',
        'POST',
        {
          market: auth.market._id,
          search: sendingsearch,
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

  // Handlers
  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  const searchPayment = (e) => {
    setSearch({
      clientname: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.saleconnector.client.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentPayments(searching);
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
  }, [getPayments, currentPage, countPage, sendingsearch, startDate, endDate]);

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
          searchPayment={searchPayment}
          setCurrentPage={setCurrentPage}
          paymentsCount={paymentsCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentPayments={currentPayments}
          setCurrentPayments={setCurrentPayments}
        />
        {currentPayments.map((payment, index) => {
          return (
            <Rows
              key={index}
              index={index}
              payment={payment}
              currentPage={currentPage}
            />
          );
        })}

        <ul className='tr font-bold text-base'>
          <li className='td col-span-6 text-right border-r'>{t("Jami")}</li>
          <li className='td text-right col-span-2 border-r-2 border-green-800'>
            {(Math.round(totalPayments.cash * 100) / 100).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-green-800'>USD</span>
          </li>
          <li className='td text-right col-span-2 border-r-2 border-orange-600'>
            {(Math.round(totalPayments.card * 100) / 100).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-orange-600'>USD</span>
          </li>
          <li className='td text-right col-span-2 border-r-2 border-red-600'>
            {(Math.round(totalPayments.transfer * 100) / 100).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-red-600'>USD</span>
          </li>
        </ul>
      </div>

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
