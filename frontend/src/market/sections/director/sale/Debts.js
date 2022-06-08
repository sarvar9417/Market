import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Debt/TableHead';
import { TableHeader } from './Debt/TableHeader';
import { Rows } from './Debt/Rows';
import { ExcelTable } from './Debt/ExcelTable';

export const Debts = () => {
  // STATES
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [search, setSearch] = useState({ id: '' });
  const [sendingsearch, setSendingSearch] = useState({ id: '' });

  const [currentDebts, setCurrentDebts] = useState([]);
  const [debtsCount, setDebtsCount] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

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
  const getDebts = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/debts/get',
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
      console.log(data);
      setCurrentDebts(data.debts);
      setSearchStorage(data.debts);
      setDebtsCount(data.count);
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

  const getDebtsExcel = async () => {
    try {
      const data = await request(
        '/api/sales/debts/getexcel',
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

  const searchDebt = (e) => {
    setSearch({
      clientname: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.saleconnector.client.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentDebts(searching);
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
    getDebts();
  }, [getDebts, currentPage, countPage, sendingsearch, startDate, endDate]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[990px]'>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          getDebtsExcel={getDebtsExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchDebt={searchDebt}
          setCurrentPage={setCurrentPage}
          debtsCount={debtsCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentDebts={currentDebts}
          setCurrentDebts={setCurrentDebts}
        />
        {currentDebts.map((debt, index) => {
          return (
            <Rows
              key={index}
              index={index}
              debt={debt}
              currentPage={currentPage}
            />
          );
        })}
      </div>

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
