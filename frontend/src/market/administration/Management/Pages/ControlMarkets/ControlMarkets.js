import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Requests } from '../../components/Requests';
import { Rows } from './Table/Rows';
import { TableHead } from './Table/TableHead';
import { TableHeader } from './Table/TableHeader';

export const ControlMarkets = () => {
  const { getBaseUrl, getMarketControls, updateMarkets } = Requests();
  const [baseUrl, setBaseUrl] = useState();
  const marketId = useParams().market;
  //====================================================================
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentMarkets, setCurrentMarkets] = useState([]);

  const [market, setMarket] = useState({});
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

  const changeFilial = (e, filial, i) => {
    let m = { ...market };
    let cm = [...currentMarkets];
    if (e.target.checked) {
      if (m.filials.indexOf(filial._id) === -1) {
        m.filials.push(filial._id);
        cm[i].mainmarket = m._id;
      }
    } else {
      const index = m.filials.indexOf;
      if (index !== -1) {
        m.filials.splice(index, 1);
        delete cm[i].mainmarket;
      }
    }
    setCurrentMarkets([...cm]);
    setMarket({ ...m });
  };

  const changeSave = (filial) => {
    updateMarkets(
      setMarket,
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch,
      market,
      filial
    );
  };

  useEffect(() => {
    getBaseUrl(setBaseUrl);
  }, [getBaseUrl]);

  useEffect(() => {
    getMarketControls(
      setMarket,
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch,
      marketId
    );
  }, [getMarketControls, countPage, currentPage, sendingsearch, marketId]);
  return (
    <div className='p-3'>
      <div className='border-blue-800 border-t-2 rounded grid grid-cols-1 md:grid-cols-2 p-3'>
        <div className='flex justify-between w-4/5 text-base m-1'>
          <span className='text-darkblue-100'>Do'kon</span>
          <span className='font-bold'>{market.name && market.name}</span>
        </div>
        <div className='flex justify-between w-4/5 text-base m-1'>
          <span className='text-darkblue-100'>Director</span>
          <span className='font-bold'>
            {market.director &&
              market.director.firstname + ' ' + market.director.lastname}
          </span>
        </div>
      </div>
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
            changeSave={changeSave}
            changeFilial={changeFilial}
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
