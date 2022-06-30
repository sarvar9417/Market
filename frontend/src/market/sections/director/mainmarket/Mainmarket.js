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

export const Mainmarket = () => {
  const auth = useContext(AuthContext);

  const [beginDay, setBeginDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDay, setEndDay] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
  );

  const { getOrderProducts } = Requests();
  const { changeProduct, addOrder, inputHandler } = Functions();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState();
  const [allProducts, setAllProducts] = useState();

  const selectRef = {
    product: useRef(),
  };

  const clearSelect = useCallback(() => {
    selectRef.supplier.current.selectOption({
      label: t('Yetkazib beruvchilar'),
      value: 'all',
    });
    selectRef.product.current.selectOption({
      label: t('Barcha mahsulotlar'),
      value: 'all',
    });
    setOrders([]);
  }, [selectRef.supplier, selectRef.product]);

  //====================================================================
  // Modal
  const [modal, setModal] = useState();
  //====================================================================
  // Visible
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState(true);
  const [visibleTemporary, setVisibleTemporary] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);

  const changeVisible = (e) => {
    e.target.name === 'setVisibleOrders'
      ? setVisibleOrders(true)
      : setVisibleOrders(false);
    e.target.name === 'setVisibleOrder'
      ? setVisibleOrder(true)
      : setVisibleOrder(false);
    e.target.name === 'setVisibleTemporary'
      ? setVisibleTemporary(true)
      : setVisibleTemporary(false);
    e.target.name === 'setVisibleProducts'
      ? setVisibleProducts(true)
      : setVisibleProducts(false);
  };

  const changeProductOrder = (e) => {
    changeProduct({ e, setOrder, orders, setModal });
  };

  useEffect(() => {
    getOrderProducts({ setProducts, setAllProducts });
  }, [getOrderProducts]);

  return (
    <div className='p-3 overflow-x-auto'>
      <RouterBtns changeVisible={changeVisible} />

      <div className={visibleProducts ? '' : 'hidden'}>
        <Products market={auth.market && auth.market.mainmarket} />
      </div>

      <div className={visibleOrders ? '' : 'hidden'}>
        <Orders />
      </div>
      <div className={visibleOrder ? '' : 'hidden'}>
        <Order
          changeProduct={changeProductOrder}
          clearSelect={clearSelect}
          selectRef={selectRef}
          products={products}
          orders={orders}
        />
      </div>

      <Modal
        modal={modal}
        setModal={setModal}
        handler={() => addOrder(order, orders, setOrder, setOrders, setModal)}
        text={
          <ModalTable
            incoming={order}
            inputHandler={(e) => inputHandler({ e, setOrder, order })}
            keyPressed={() =>
              addOrder(order, orders, setOrder, setOrders, setModal)
            }
          />
        }
      />
    </div>
  );
};
