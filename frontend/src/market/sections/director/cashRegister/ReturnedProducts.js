import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { ExcelTable } from './ReturnedProducts/ExcelTable';
import { Rows } from './ReturnedProducts/Rows';
import { TableHead } from './ReturnedProducts/TableHead';
import { TableHeader } from './ReturnedProducts/TableHeader';

export const ReturnedProducts = ({ changeCheck }) => {
  //========================================================
  //========================================================

  const { request } = useHttp();
  const auth = useContext(AuthContext);

  //========================================================
  //========================================================

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [sendingsearch, setSendingSearch] = useState({ id: '', client: '' });
  const [search, setSearch] = useState({ id: '', client: '' });

  //========================================================
  //========================================================

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

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

  const [salesConnectors, setSalesConnectors] = useState();
  const [searhStorage, setSearchStorage] = useState([]);
  const [returnedCount, setReturnedCount] = useState(0);
  const [excelTable, setExcelTable] = useState([]);

  const getSaleConnectors = useCallback(async () => {
    try {
      const data = await request(
        `/api/reports/returnedproduct`,
        'POST',
        {
          market: auth.market._id,
          currentPage,
          countPage,
          startDate,
          endDate,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setSalesConnectors(data.returnedproducts);
      setSearchStorage(data.returnedproducts);
      setReturnedCount(data.count);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    auth,
    notify,
    countPage,
    currentPage,
    startDate,
    endDate,
    sendingsearch,
  ]);

  const getSaleConnectorsExcel = useCallback(async () => {
    try {
      const data = await request(
        `/api/reports/returnedproductsexcel`,
        'POST',
        {
          market: auth.market._id,
          startDate,
          endDate,
          search: sendingsearch,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExcelTable(data);
      document.getElementById('reacthtmltoexcel').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify, startDate, endDate, sendingsearch]);

  //========================================================
  //========================================================

  // Search
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

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  const changeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'id') {
      const searching = searhStorage.filter((item) =>
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSalesConnectors(searching);
    } else {
      const searching = searhStorage.filter(
        (item) =>
          item.client &&
          item.client.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSalesConnectors(searching);
    }
  };

  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);

  //========================================================
  //========================================================

  useEffect(() => {
    getSaleConnectors();
  }, [currentPage, getSaleConnectors, countPage, sendingsearch]);

  //========================================================
  //========================================================

  return (
    <>
      <TableHeader
        keyPressed={searchKeypress}
        changeSearch={changeSearch}
        getSaleConnectorsExcel={getSaleConnectorsExcel}
        currentPage={currentPage}
        changeDate={changeDate}
        startDate={startDate}
        countPage={countPage}
        endDate={endDate}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        totalDatas={returnedCount}
      />
      <TableHead sales={salesConnectors} setSales={setSalesConnectors} />
      {salesConnectors &&
        salesConnectors.map((saleconnector, index) => {
          return (
            <Rows
              countPage={countPage}
              index={index}
              saleconnector={saleconnector}
              currentPage={currentPage}
              key={index}
            />
          );
        })}

      <div className='hidden'>
        <ExcelTable saleconnectors={excelTable} />
      </div>
    </>
  );
};
