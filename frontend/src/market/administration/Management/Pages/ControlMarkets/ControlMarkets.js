import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Requests } from '../../components/Requests';
import { Rows } from './Table/Rows';
import { TableHead } from './Table/TableHead';
import { TableHeader } from './Table/TableHeader';

export const ControlMarkets = () => {
  const {
    getBaseUrl,
    getMarketControls,
    updateMarkets,
    getPermission,
    createPermission,
  } = Requests();
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
  const [permission, setPermission] = useState({
    creates: false,
    incomings: false,
    inventories: false,
    sales: false,
    reporters: false,
    sellers: false,
    calculations: false,
    branches: false,
    mainmarket: false,
    market: marketId,
  });
  const permissions = [
    { name: 'creates', title: 'Yaratish va tahrirlash' },
    { name: 'incomings', title: 'Mahsulot kirim qilish' },
    { name: 'inventories', title: 'Inventorizatsiya' },
    { name: 'sales', title: "Sotuv bo'limi" },
    { name: 'reporters', title: 'Yetkazib beruvchilar' },
    { name: 'sellers', title: 'Sotuvchilar' },
    { name: 'calculations', title: 'Kassa' },
    { name: 'branches', title: 'Filiallar' },
    { name: 'mainmarket', title: "Bosh do'kon" },
  ];
  const changePermission = (e) => {
    setPermission({ ...permission, [e.target.name]: e.target.checked });
  };
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
    getPermission(setPermission, market.permission);
  }, [getPermission, market]);

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
    <div className='p-3 '>
      <div className='grid grid-cols-6 gap-4 mb-3'>
        <div className='rounded overflow-hidden col-span-6  md:col-span-2 shadow-2xl'>
          <div className='py-1 bg-blue-800 text-base font-bold text-white text-center'>
            Do'kon ma'lumotlari
          </div>
          <div className='p-3'>
            <div className='flex justify-between text-base font-bold'>
              <span className='text-blue-900'>Do'kon:</span>
              <span>{market.name}</span>
            </div>
            <div className='flex justify-between text-base font-bold'>
              <span className='text-blue-900'>Direktor:</span>
              <span>
                {market.director &&
                  market.director.firstname + ' ' + market.director.lastname}
              </span>
            </div>
            <div className='flex justify-between text-base font-bold'>
              <span className='text-blue-900'>Telefon</span>
              <span>{market.phone1 && '+998 ' + market.phone1}</span>
            </div>
            <div className='flex justify-between text-base font-bold'>
              <span></span>
              <span>{market.phone2 && '+998 ' + market.phone2}</span>
            </div>
            <div className='flex justify-between text-base font-bold'>
              <span></span>
              <span>{market.phone3 && '+998 ' + market.phone3}</span>
            </div>
          </div>
        </div>
        <div className='rounded overflow-hidden col-span-6  md:col-span-4 shadow-2xl'>
          <div className='py-1 bg-blue-800 text-base font-bold text-white text-center'>
            Ruxsat etilgan xizmatlar
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-3'>
            {permissions.map((data, key) => {
              return (
                <div key={key}>
                  <label className='flex items-center'>
                    <input
                      checked={permission[data.name]}
                      onChange={changePermission}
                      type='checkbox'
                      className='w-[15px] h-[15px]'
                      name={data.name}
                    />
                    <span className='font-bold pl-2 text-[#777]'>
                      {data.title}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
          <div className='text-right px-3  mb-2'>
            <button
              className='px-4 py-1 bg-green-700 hover:bg-green-800 text-white rounded'
              onClick={() => {
                createPermission(permission, setPermission);
              }}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
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
