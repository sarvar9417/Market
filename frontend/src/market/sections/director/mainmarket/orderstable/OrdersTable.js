import React, { useCallback, useEffect, useState } from 'react';
import { Requests } from '../components/Requests';

export const OrdersTable = ({ orderConnector }) => {
  //====================================================================
  // Pagination
  const { getOrderProducts } = Requests();
  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [search, setSearch] = useState({
    code: '',
    name: '',
  });
  const [sendingsearch, setSendingSearch] = useState({ code: '', name: '' });
  //====================================================================
  //====================================================================

  const [orders, setOrders] = useState([]);
  const [excelDatas, setExcelDatas] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);

  //====================================================================
  // SEARCH
  const searchOrders = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = searchStorage.filter((item) =>
        item.orderdata.code.includes(e.target.value)
      );
      setCurrentOrders(searching);
    }
    if (e.target.name === 'name') {
      const searching = searchStorage.filter((item) =>
        item.orderdata.name.includes(e.target.value)
      );
      setCurrentOrders(searching);
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
      setCurrentOrders(orders.slice(0, e.target.value));
    },
    [orders]
  );

  useEffect(() => {
    orderConnector && getOrderProducts(orderConnector);
  }, [currentPage, countPage, sendingsearch, orderConnector, getOrderProducts]);
  return <div>OrdersTable</div>;
};
