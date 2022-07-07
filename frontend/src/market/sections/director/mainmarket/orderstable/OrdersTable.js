import React, { useCallback, useEffect, useState } from 'react';
import { Requests } from '../components/Requests';
import { TableHead } from './tables/TableHead';
import { TableHeader } from './tables/TableHeader';
import { TableRow } from './tables/TableRow';

export const OrdersTable = ({
  orderConnector,
  position,
  setPosition,
  changeConnectorPosition,
}) => {
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

  const [orders, setOrders] = useState([]);

  //====================================================================
  // SEARCH
  const searchOrders = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if (e.target.name === 'code') {
      const searching = orders.filter((item) =>
        item.productdata.code.includes(e.target.value)
      );
      setCurrentOrders(searching);
    }
    if (e.target.name === 'name') {
      const searching = orders.filter((item) =>
        item.productdata.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
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

  const setPageSize = useCallback(
    (e) => {
      setCurrentPage(0);
      setCountPage(e.target.value);
      setCurrentOrders(orders.slice(0, e.target.value));
    },
    [orders]
  );

  useEffect(() => {
    orderConnector &&
      getOrderProducts({
        orderConnector,
        countPage,
        currentPage,
        setCurrentOrders,
        setOrders,
        setOrdersCount,
        sendingsearch,
      });
  }, [currentPage, countPage, sendingsearch, orderConnector, getOrderProducts]);

  return (
    <div className='p-3'>
      <TableHeader
        position={position}
        changeConnectorPosition={changeConnectorPosition}
        changeHandler={searchOrders}
        keyPress={searchKeypress}
        search={search}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        currentPage={currentPage}
        countPage={countPage}
        productsCount={ordersCount}
      />
      <TableHead
        currentOrders={currentOrders}
        setCurrentOrders={setCurrentOrders}
      />
      {currentOrders.map((order, index) => {
        return (
          <TableRow
            key={order._id}
            countPage={currentPage}
            currentPage={currentPage}
            index={index}
            p={order}
          />
        );
      })}
    </div>
  );
};
