import React, { useCallback, useEffect, useState } from 'react';

import { Requests } from '../../components/Requests';
import { Rows } from './Market/Rows';
import { TableHead } from './Market/TableHead';
import { TableHeader } from './Market/TableHeader';

export const Matkets = () => {
  const { getBaseUrl, getMarkets } = Requests();
  const [baseUrl, setBaseUrl] = useState();
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentMarkets, setCurrentMarkets] = useState([]);

  const [marketsCount, setMarketsCount] = useState(0);
  const [search, setSearch] = useState({
    director: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({
    director: '',
    name: '',
  });
  const setPageSize = (e) => {
    setCurrentPage(0);
    setCountPage(e.target.value);
  };
  const [searchStorage, setSearchStorage] = useState([]);

  const searchKeypress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        setCurrentPage(0);
        setSendingSearch(search);
      }
    },
    [search]
  );

  const searchMarket = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });

    const searching = searchStorage.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentMarkets(searching);
  };

  const searchDirector = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });

    const searching = searchStorage.filter(
      (item) =>
        item.director &&
        (item.director.firstname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
          item.director.lastname
            .toLowerCase()
            .includes(e.target.value.toLowerCase()))
    );
    setCurrentMarkets(searching);
  };

  useEffect(() => {
    getBaseUrl(setBaseUrl);
  }, [getBaseUrl]);

  useEffect(() => {
    getMarkets(
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch
    );
  }, [getMarkets, countPage, currentPage, sendingsearch]);
  return (
    <div className='p-3'>
      <TableHeader
        searchMarket={searchMarket}
        countPage={countPage}
        currentPage={currentPage}
        totalDatas={marketsCount}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        searchKeypress={searchKeypress}
        search={search}
        searchDirector={searchDirector}
      />
      <TableHead
        setCurrentMarkets={setCurrentMarkets}
        currentMarkets={currentMarkets}
      />
      {currentMarkets.map((market, index) => {
        return (
          <Rows
            baseUrl={baseUrl}
            market={market}
            key={market._id}
            currentPage={currentPage}
            index={index}
          />
        );
      })}
    </div>
  );
};
