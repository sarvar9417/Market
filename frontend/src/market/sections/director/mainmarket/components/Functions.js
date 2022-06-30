import { t } from 'i18next';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Notify } from '../../components/Notify';

export const Functions = () => {
  const auth = useContext(AuthContext);

  const notify = Notify().notify;
  const changeProduct = ({ e, setOrder, orders, setModal }) => {
    console.log(e);
    if (e.value === 'all') {
      return setOrder({
        totalprice: 0,
        unitprice: 0,
        pieces: 0,
        user: auth.userId,
        supplier: '',
        product: {},
        unit: '',
      });
    }
    for (const i in orders) {
      if (orders[i].product._id === e.product._id) {
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
      totalprice: 0,
      unitprice: 0,
      pieces: 0,
      user: auth.userId,
      product: {
        _id: e.product._id && e.product._id,
        name: e.product.productdata && e.product.productdata.name,
        code: e.product.productdata && e.product.productdata.code,
      },
      unit: e.product.unit && e.product.unit,
      oldprice: e.product.price.orderprice,
    });
    setModal(true);
  };

  const addOrder = ({ order, orders, setOrder, setOrders, setModal }) => {
    if (order.pieces === 0 || order.pieces === '') {
      return notify({
        title: t('Diqqat! Mahsulot soni kiritilmagan.'),
        description: t('Iltimos Qabul qilinayotgan mahsulot sonini kiriting'),
        status: 'warning',
      });
    }
    if (order.unitprice === 0 || order.unitprice === '') {
      return notify({
        title: t('Diqqat! Mahsulot narxi kiritilmagan.'),
        description: t('Iltimos Qabul qilinayotgan mahsulot narxini kiriting.'),
        status: 'warning',
      });
    }
    let i = [...orders];
    i.unshift({ ...order });
    setOrders(i);
    setOrder({
      totalprice: 0,
      unitprice: 0,
      pieces: 0,
      user: auth.userId,
      supplier: '',
      product: {},
      unit: '',
    });
    setModal(false);
  };

  const inputHandler = ({ e, setOrder, order }) => {
    if (e.target.name === 'pieces') {
      let val = e.target.value;
      setOrder({
        ...order,
        pieces: val === '' ? '' : Math.round(val * 10000) / 10000,
        totalprice:
          val === ''
            ? ''
            : Math.round(order.unitprice * e.target.value * 10000) / 10000,
      });
    }
    if (e.target.name === 'unitprice') {
      let val = e.target.value;
      setOrder({
        ...order,
        unitprice: val === '' ? '' : Math.round(val * 10000) / 10000,
        totalprice:
          val === ''
            ? '0'
            : Math.round(e.target.value * order.pieces * 10000) / 10000,
      });
    }
    if (e.target.name === 'totalprice') {
      let val = e.target.value;
      setOrder({
        ...order,
        unitprice:
          val === '' || val === 0
            ? ''
            : Math.round((e.target.value / order.pieces) * 10000) / 10000,
        totalprice: val === '' ? '' : Math.round(val * 10000) / 10000,
      });
    }
  };

  return { changeProduct, addOrder, inputHandler };
};
