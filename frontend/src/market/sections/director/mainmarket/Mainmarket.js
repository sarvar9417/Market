import { t } from 'i18next';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Functions } from './components/Functions';
import { Requests } from './components/Requests';
import { RouterBtns } from './components/RouterBtns';
import { Order } from './order/Order';
import { Orders } from './orders/Orders';
import { Products } from './products/Products';
import { Modal } from '../components/Modal';
import { ModalTable } from './order/RegisterOrder/ModalTable';
import { OrdersTable } from './orderstable/OrdersTable';

export const Mainmarket = () => {
  const auth = useContext(AuthContext);

  const [beginDay, setBeginDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  const {
    registerOrderProducts,
    registerOrders,
    getOrdersList,
    updateOrderConnector,
  } = Requests();

  const { changeProduct, addOrder, inputHandler, changePosition } = Functions();

  const [orders, setOrders] = useState([]);
  const [orderConnector, setOrderConnector] = useState();
  const [ordersList, setOrdersList] = useState([]);
  const [order, setOrder] = useState({
    orderpieces: 0,
    customermarket: auth.market._id,
    receivermarket: auth.market.mainmarket,
  });
  const [products, setProducts] = useState([]);

  const selectRef = {
    product: useRef(),
  };

  const clearSelect = useCallback(() => {
    selectRef.product.current.selectOption({
      label: t('Barcha mahsulotlar'),
      value: 'all',
    });
    setOrders([]);
  }, [selectRef.product]);

  //====================================================================
  // Modal
  const [modal, setModal] = useState();
  const [modal2, setModal2] = useState();
  const [modal3, setModal3] = useState();
  //====================================================================
  // Visible
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [position, setPosition] = useState();

  const changeConnectorPosition = (e) => {
    changePosition({ e, setModal3, setPosition });
  };
  const changeVisible = (e) => {
    setOrderConnector();
    e.target.name === 'setVisibleOrders'
      ? setVisibleOrders(true)
      : setVisibleOrders(false);
    e.target.name === 'setVisibleOrder'
      ? setVisibleOrder(true)
      : setVisibleOrder(false);
    e.target.name === 'setVisibleProducts'
      ? setVisibleProducts(true)
      : setVisibleProducts(false);
  };

  const changeProductOrder = (e) => {
    changeProduct({ e, setOrder, orders, setModal, order });
  };

  const changeOrderConnector = (order) => {
    setOrderConnector(order._id);
    setPosition(order.position);
  };

  const editOrder = (product, index) => {
    setOrder(product);
    let i = [...orders];
    i.splice(index, 1);
    setOrders(i);
    setModal(true);
  };

  const removeOrder = (index) => {
    let i = [...orders];
    i.splice(index, 1);
    setOrders(i);
  };

  const sendingOrders = () => {
    registerOrders({ orders, beginDay, endDay, setOrdersList });
    setModal2(false);
    clearSelect();
    setOrder({
      orderpieces: 0,
      customermarket: auth.market._id,
      receivermarket: auth.market.mainmarket,
    });
    setOrders([]);
    setVisibleOrder(false);
    setVisibleOrders(true);
  };

  const update = () => {
    updateOrderConnector({
      setOrdersList,
      beginDay,
      endDay,
      orderConnector,
      position,
      setPosition,
      setModal3,
    });
  };

  useEffect(() => {
    registerOrderProducts({ setProducts });
  }, [registerOrderProducts]);

  useEffect(() => {
    getOrdersList({ setOrdersList, beginDay, endDay });
  }, [getOrdersList, beginDay, endDay]);
  return (
    <div className='p-3 overflow-x-auto'>
      <RouterBtns changeVisible={changeVisible} />

      <div className={visibleProducts ? '' : 'hidden'}>
        <Products market={auth.market && auth.market.mainmarket} />
      </div>

      <div className={visibleOrders ? '' : 'hidden'}>
        <Orders
          changeOrderConnector={changeOrderConnector}
          ordersList={ordersList}
          setBeginDay={setBeginDay}
          setEndDay={setEndDay}
        />
      </div>
      <div className={visibleOrder ? '' : 'hidden'}>
        <Order
          setModal={setModal2}
          removeOrder={removeOrder}
          editOrder={editOrder}
          changeProduct={changeProductOrder}
          clearSelect={clearSelect}
          selectRef={selectRef}
          products={products}
          orders={orders}
        />
      </div>
      <div className={orderConnector ? '' : 'hidden'}>
        <OrdersTable
          changeConnectorPosition={changeConnectorPosition}
          orderConnector={orderConnector}
          position={position}
          setPosition={setPosition}
        />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        handler={() =>
          addOrder({ order, orders, setOrder, setOrders, setModal })
        }
        text={
          <ModalTable
            order={order}
            inputHandler={(e) => inputHandler({ e, setOrder, order })}
            keyPressed={() =>
              addOrder({ order, orders, setOrder, setOrders, setModal })
            }
          />
        }
      />

      <Modal
        modal={modal2}
        setModal={setModal2}
        basic={'Diqqat! Mahsulotlarga buyurtma berishi tasdiqaysizmi?'}
        handler={sendingOrders}
      />

      <Modal
        handler={update}
        modal={modal3}
        setModal={setModal3}
        basic='Diqqat! Buyurtmalarni qabul qilib olganingizni tasdiqlaysizmi?'
      />
    </div>
  );
};
