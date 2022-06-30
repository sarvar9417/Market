import React, { useEffect, useState } from 'react';
import { TableHead } from './table/TableHead';
import { TableHeader } from './table/TableHeader';
import { Rows } from './table/Rows';
import { ExcelTable } from './table/ExcelTable';
import { t } from 'i18next';
import { Requests } from '../components/Requests';

export const Payments = ({ market }) => {
  // STATES
  const { getPayments, getPaymentsExcel } = Requests();

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

  const changeExcelDownload = () => {
    getPaymentsExcel(setTableExcel, sendingsearch, startDate, endDate, market);
  };

  useEffect(() => {
    market &&
      getPayments(
        currentPage,
        countPage,
        sendingsearch,
        startDate,
        endDate,
        setCurrentPayments,
        setSearchStorage,
        setPaymentsCount,
        setTotalPayments,
        market
      );
  }, [
    getPayments,
    currentPage,
    countPage,
    sendingsearch,
    startDate,
    endDate,
    market,
  ]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[990px]'>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          getPaymentsExcel={changeExcelDownload}
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
          <li className='td col-span-5 text-right border-r'>{t('Jami')}</li>
          <li className='td text-right col-span-2 border-r-2 border-green-800'>
            {(Math.round(totalPayments.cash * 10000) / 10000).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-green-800'>USD</span>
          </li>
          <li className='td text-right col-span-2 border-r-2 border-orange-600'>
            {(Math.round(totalPayments.card * 10000) / 10000).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-orange-600'>USD</span>
          </li>
          <li className='td text-right border-r-2 border-red-600'>
            {(
              Math.round(totalPayments.transfer * 10000) / 10000
            ).toLocaleString('ru-RU')}{' '}
            <span className='text-red-600'>USD</span>
          </li>
        </ul>
      </div>

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
