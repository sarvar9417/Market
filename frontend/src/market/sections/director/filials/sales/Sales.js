import React, { useCallback, useEffect, useState } from 'react';
import { Requests } from '../components/Requests';
import { ChequeConnectors } from './table/ChequeConnectors';
import { ExcelTable } from './table/ExcelTable';
import { Rows } from './table/Rows';
import { TableHead } from './table/TableHead';
import { TableHeader } from './table/TableHeader';

export const Sales = ({ market }) => {
  //====================================================================
  // SearchData
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  //====================================================================
  // Pagination
  const { getSaleConnectors, getSaleConnectorsExcel } = Requests();
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  const [excelTable, setExcelTable] = useState([]);
  const [checkConnectors, setCheckConnectors] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [saleCounts, setSaleCounts] = useState(0);

  const [allSales, setAllSales] = useState({
    products: [],
    payments: [],
    debts: [],
    discounts: [],
    user: [],
  });

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch(search);
    }
  };

  // ===================================================================
  // Saleconnectors
  const [saleconnectors, setSaleConnectors] = useState([]);
  const [search, setSearch] = useState({ id: '', client: '' });
  const [sendingsearch, setSendingSearch] = useState({ id: '', client: '' });

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

  const changeSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'id') {
      const searching = saleconnectors.filter((item) =>
        item.id.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentProducts(searching);
    } else {
      const searching = saleconnectors.filter(
        (item) =>
          item.client &&
          item.client.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCurrentProducts(searching);
    }
  };

  const setPageSize = useCallback((e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  }, []);

  const changeCheck = (e) => {
    setCheckConnectors(true);
    setAllSales(e);
    window.scroll({ top: 0 });
  };

  const changeExcelDownload = () => {
    getSaleConnectorsExcel(
      startDate,
      endDate,
      sendingsearch,
      setExcelTable,
      market
    );
  };

  useEffect(() => {
    market &&
      getSaleConnectors(
        countPage,
        currentPage,
        startDate,
        endDate,
        sendingsearch,
        setSaleCounts,
        setCurrentProducts,
        setSaleConnectors,
        market
      );
  }, [
    currentPage,
    getSaleConnectors,
    countPage,
    market,
    endDate,
    sendingsearch,
    startDate,
  ]);
  return (
    <div className='overflow-x-auto'>
      <div className={`${checkConnectors ? '' : 'hidden'}`}>
        <ChequeConnectors sales={allSales} setCheck={setCheckConnectors} />
      </div>
      <div className='min-w-[992px]'>
        <TableHeader
          keyPressed={searchKeypress}
          changeSearch={changeSearch}
          getSaleConnectorsExcel={changeExcelDownload}
          currentPage={currentPage}
          changeDate={changeDate}
          startDate={startDate}
          endDate={endDate}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          categoryCount={saleCounts}
          countPage={countPage}
        />
        <TableHead sales={currentProducts} setSales={setCurrentProducts} />
        {currentProducts.map((saleconnector, index) => {
          return (
            <Rows
              countPage={countPage}
              currentPage={currentPage}
              key={index}
              index={index}
              saleconnector={saleconnector}
              changeCheck={changeCheck}
            />
          );
        })}
      </div>
      <ExcelTable saleconnectors={excelTable} />
    </div>
  );
};
