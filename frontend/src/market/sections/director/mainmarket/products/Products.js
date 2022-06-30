import React, { useCallback, useEffect, useState } from 'react';
import { Requests } from '../components/Requests';
import { ExcelTable } from './tables/ExcelTable';
import { TableHead } from './tables/TableHead';
import { TableHeader } from './tables/TableHeader';
import { TableRow } from './tables/TableRow';

export const Products = ({ market }) => {
  //====================================================================
  // Pagination
  const { getProducts, getProductExcel } = Requests();
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
  //====================================================================
  //====================================================================

  const [products, setProducts] = useState([]);
  const [excelDatas, setExcelDatas] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  //====================================================================
  // SEARCH
  const searchProducts = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.productdata.code.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.productdata.name.includes(e.target.value)
      );
      setCurrentProducts(searching);
    }
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch({ ...search });
    }
  };
  //====================================================================
  //====================================================================
  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentProducts(products.slice(0, e.target.value));
    },
    [products]
  );

  useEffect(() => {
    market &&
      getProducts(
        setCurrentProducts,
        setSearchStorage,
        currentPage,
        countPage,
        sendingsearch,
        setProducts,
        setProductsCount,
        market
      );
  }, [getProducts, currentPage, countPage, sendingsearch, market]);
  return (
    <>
      {/* {loading ? <Loader /> : ''} */}
      <div className='overflow-x-auto'>
        <div className='m-3 min-w-[800px]'>
          <TableHeader
            market={market}
            sendingsearch={sendingsearch}
            setExcelDatas={setExcelDatas}
            search={search}
            currentPage={currentPage}
            setPageSize={setPageSize}
            changeHandler={searchProducts}
            keyPress={searchKeypress}
            countPage={countPage}
            setCurrentPage={setCurrentPage}
            productsCount={productsCount}
            getProductExcel={getProductExcel}
          />
          <TableHead
            currentProducts={currentProducts}
            setCurrentProducts={setCurrentProducts}
          />
          {currentProducts &&
            currentProducts.map((p, index) => {
              return (
                <TableRow
                  countPage={countPage}
                  p={p}
                  index={index}
                  currentPage={currentPage}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <ExcelTable products={excelDatas} />
    </>
  );
};
