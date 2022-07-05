import React, { useCallback, useEffect, useState } from 'react';
import { Functions } from '../components/Functions';
import { Requests } from '../components/Requests';
import { TableHead } from './tables/TableHead';
import { TableHeader } from './tables/TableHeader';
import { TableRow } from './tables/TableRow';

export const OrdersTable = ({
  orderConnector,
  setPosition,
  position,
  changeConnectorPosition,
}) => {
  //====================================================================
  // Pagination
  const { getOrderProducts, updateOrderProducts } = Requests();
  const { searchOrdersFunction, changeInput } = Functions();

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
    searchOrdersFunction({
      e,
      orders,
      setSearch,
      search,
      setCurrentOrders,
    });
  };

  const changeInputs = (e, i) => {
    changeInput({ e, currentOrders, setCurrentOrders, i });
  };

  const searchKeypress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(0);
      setSendingSearch({ ...search });
    }
  };

  const saveHandler = (e) => {
    updateOrderProducts({
      setPosition,
      orderConnector,
      countPage,
      currentPage,
      setCurrentOrders,
      setOrders,
      setOrdersCount,
      sendingsearch,
      order: e,
    });
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
        setPosition,
        orderConnector,
        countPage,
        currentPage,
        setCurrentOrders,
        setOrders,
        setOrdersCount,
        sendingsearch,
      });
  }, [
    currentPage,
    countPage,
    sendingsearch,
    orderConnector,
    getOrderProducts,
    setPosition,
  ]);

  return (
    <div className='p-3'>
      <TableHeader
        changeConnectorPosition={changeConnectorPosition}
        position={position}
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
            saveHandler={saveHandler}
            position={position}
            changeInputs={changeInputs}
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
