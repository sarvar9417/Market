import React, { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { Functions } from './components/Functions';
import { Requests } from './components/Requests';
import { Orders } from './orders/Orders';
import { OrdersTable } from './orderstable/OrdersTable';

export const OrdersList = () => {
  const [beginDay, setBeginDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  const [position, setPosition] = useState();

  const [orderConnector, setOrderConnector] = useState();

  const [ordersList, setOrdersList] = useState([]);
  const [modal, setModal] = useState(false);
  const { getOrdersList, updateOrderConnector } = Requests();
  const { changePosition, positions } = Functions();

  const changeConnectorPosition = (e) => {
    changePosition({ e, setModal, setPosition });
  };

  const update = () => {
    updateOrderConnector({
      setOrdersList,
      beginDay,
      endDay,
      orderConnector,
      position,
      setPosition,
      setModal,
    });
  };

  useEffect(() => {
    getOrdersList({ setOrdersList, beginDay, endDay });
  }, [getOrdersList, beginDay, endDay]);

  return (
    <div className='p-3 overflow-x-auto'>
      <Orders
        setOrderConnector={setOrderConnector}
        ordersList={ordersList}
        setBeginDay={setBeginDay}
        setEndDay={setEndDay}
      />

      <div className={orderConnector ? '' : 'hidden'}>
        <OrdersTable
          changeConnectorPosition={changeConnectorPosition}
          position={position}
          orderConnector={orderConnector}
          setPosition={setPosition}
        />
      </div>

      <Modal
        handler={update}
        modal={modal}
        setModal={setModal}
        basic={positions[position]}
      />
    </div>
  );
};
