import { t } from 'i18next';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Notify } from '../../components/Notify';

export const Functions = () => {
  const auth = useContext(AuthContext);

  const notify = Notify().notify;
  const changeProduct = ({ e, setOrder, orders, setModal, order }) => {
    if (e.value === 'all') {
      return setOrder({
        orderpieces: 0,
        customermarket: auth.market._id,
        receivermarket: auth.market.mainmarket,
      });
    }
    for (const i in orders) {
      if (orders[i].product === e.product._id) {
        return notify({
          title: `${t("Diqqat! Ushbu mahsulot ro'yxatga")} ${
            parseInt(i) + 1
          } ${t('-raqamda kiritilgan.')}`,
          description: t(
            "Qiymatlarini o'zgartirish uchun tahrirlash tugmasini bosishingiz mumkin"
          ),
          status: 'warning',
        });
      }
    }

    setOrder({
      ...order,
      productdata: e.product.productdata,
      price: e.product.price,
      product: e.product._id,
      unit: e.product.unit,
      orderpieces: 0,
    });
    setModal(true);
  };

  const addOrder = ({ order, orders, setOrder, setOrders, setModal }) => {
    if (order.orderpieces === 0 || order.orderpieces === '') {
      return notify({
        title: t('Diqqat! Mahsulot soni kiritilmagan.'),
        description: t(
          'Iltimos buyurtma qilinayotgan mahsulot sonini kiriting'
        ),
        status: 'warning',
      });
    }

    let o = [...orders];
    o.push(order);
    setOrders([...o]);
    setOrder({
      orderpieces: 0,
      customermarket: auth.market._id,
      receivermarket: auth.market.mainmarket,
    });
    setModal(false);
  };

  const inputHandler = ({ e, setOrder, order }) => {
    if (e.target.name === 'pieces') {
      let val = e.target.value;
      setOrder({
        ...order,
        orderpieces:
          val === '' ? '' : Math.round(e.target.value * 10000) / 10000,
      });
    }
  };

  return { changeProduct, addOrder, inputHandler };
};
