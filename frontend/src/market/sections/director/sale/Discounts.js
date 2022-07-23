import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './Discount/TableHead';
import { TableHeader } from './Discount/TableHeader';
import { Rows } from './Discount/Rows';
import { ExcelTable } from './Discount/ExcelTable';
import { useToast } from '@chakra-ui/react';
import { t } from 'i18next';

export const Discounts = ({ beginDay, endDay, currency }) => {
  // STATES
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [search, setSearch] = useState({ clientname: '' });
  const [sendingsearch, setSendingSearch] = useState({ clientname: '' });

  const [currentDiscounts, setCurrentDiscounts] = useState([]);
  const [discountsCount, setDiscountsCount] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [startDate, setStartDate] = useState(beginDay);
  const [endDate, setEndDate] = useState(endDay);
  const [totalDiscounts, setTotalDiscounts] = useState();
  const [totalDiscountsUzs, setTotalDiscountsUzs] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceUzs, setTotalPriceUzs] = useState(0);
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
  const getDiscounts = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/discounts/get',
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
      setTotalDiscounts(data.totaldiscounts);
      setTotalDiscountsUzs(data.totaldiscountsuzs);
      setTotalPrice(data.total);
      setTotalPriceUzs(data.totaluzs);
      setCurrentDiscounts(data.discounts);
      setSearchStorage(data.discounts);
      setDiscountsCount(data.count);
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

  const getDiscountsExcel = async () => {
    try {
      const data = await request(
        '/api/sales/discounts/getexcel',
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

  const searchDiscount = (e) => {
    setSearch({
      clientname: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.saleconnector.client.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentDiscounts(searching);
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
    getDiscounts();
  }, [getDiscounts, currentPage, countPage, sendingsearch, startDate, endDate]);

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[990px]'>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          getDiscountsExcel={getDiscountsExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchDiscount={searchDiscount}
          setCurrentPage={setCurrentPage}
          discountsCount={discountsCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentDiscounts={currentDiscounts}
          setCurrentDiscounts={setCurrentDiscounts}
        />
        {currentDiscounts.map((discount, index) => {
          return (
            <Rows
              currency={currency}
              key={index}
              index={index}
              discount={discount}
              currentPage={currentPage}
            />
          );
        })}
        <ul className='tr font-bold text-base'>
          <li className='td col-span-6 text-right border-r'>{t('Jami')}</li>
          <li className='td text-right col-span-3 border-r-2 border-green-800'>
            {currency === 'UZS'
              ? (Math.round(totalPriceUzs * 1) / 1).toLocaleString('ru-RU')
              : (Math.round(totalPrice * 10000) / 10000).toLocaleString(
                  'ru-RU'
                )}{' '}
            <span className='text-green-800'>{currency}</span>
          </li>
          <li className='td text-right col-span-3 border-r-2 border-orange-600'>
            {currency === 'UZS'
              ? (Math.round(totalDiscountsUzs * 1) / 1).toLocaleString('ru-RU')
              : (Math.round(totalDiscounts * 1000) / 1000).toLocaleString(
                  'ru-RU'
                )}{' '}
            <span className='text-orange-600'>{currency}</span>
          </li>
        </ul>
      </div>

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
