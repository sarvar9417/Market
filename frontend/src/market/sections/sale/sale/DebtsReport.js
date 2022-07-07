import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { TableHead } from './DebtsReport/TableHead';
import { TableHeader } from './DebtsReport/TableHeader';
import { Rows } from './DebtsReport/Rows';
import { ExcelTable } from './DebtsReport/ExcelTable';
import { Modal } from '../components/Modal';
import { PrePaymentCard } from '../sale/PrePaymentCard/PrepaymentCard';
import { t } from 'i18next';

export const DebtsReport = ({}) => {
  // STATES
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);
  const [search, setSearch] = useState({ id: '' });
  const [sendingsearch, setSendingSearch] = useState({ id: '' });

  const [currentDebts, setCurrentDebts] = useState([]);
  const [debtsCount, setDebtsCount] = useState([]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [tableExcel, setTableExcel] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [totalDebts, setTotalDebts] = useState(0);
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
  const getDebts = useCallback(async () => {
    try {
      const data = await request(
        '/api/sales/debts/get',
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
      setTotalDebts(data.total);
      setCurrentDebts(data.debts);
      setSearchStorage(data.debts);
      setDebtsCount(data.count);
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

  const getDebtsExcel = async () => {
    try {
      const data = await request(
        '/api/sales/debts/getexcel',
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

  const searchDebt = (e) => {
    setSearch({
      clientname: e.target.value,
    });
    const searching = searchStorage.filter((item) =>
      item.saleconnector.client.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setCurrentDebts(searching);
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

  //=====================================================
  //=====================================================

  //=====================================================
  //=====================================================

  const [modal6, setModal6] = useState(false);

  const [prePaymentVisible, setPrePaymentVisible] = useState(false);

  const [prePaymentDebt, setPrePaymentDebt] = useState({
    debt: 0,
    debtuzs: 0,
    comment: '',
  });

  const [exchangerate, setExchangerate] = useState({ exchangerate: 0 });
  const getExchangerate = useCallback(async () => {
    try {
      const data = await request(
        `/api/exchangerate/get`,
        'POST',
        { market: auth.market._id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setExchangerate(data);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [request, auth, notify]);

  const [prePayment, setPrePayment] = useState({
    totalprice: 0,
    totalpriceuzs: 0,
    type: 'cash',
    cash: 0,
    card: 0,
    transfer: 0,
    carduzs: 0,
    cashuzs: 0,
    transferuzs: 0,
    discount: 0,
    discountuzs: 0,
  });

  const [prePaymentType, setPrePaymentType] = useState({
    type: 'cash',
    name: 'Naqt',
  });

  const [prePaymentTotalPrice, setPrePaymentTotalPrice] = useState({});
  const [prePaymentTotalPriceUzs, setPrePaymentTotalPriceUzs] = useState({});

  const [prePaymentSaleConnector, setPrePaymentSaleConnector] = useState({});

  let types = ['cash', 'card', 'transfer'];

  const prePaymentComment = (e) => {
    setPrePayment({ ...prePayment, comment: e.target.value });
  };

  const checkPrePayment = () => {
    if (prePayment.card + prePayment.cash + prePayment.transfer === 0) {
      return notify({
        title: t("Diqqat! To'lov summasi kiritilmagan"),
        description: '',
        status: 'error',
      });
    }

    return setModal6(true);
  };

  const changePrepayment = (e) => {
    setPrePaymentVisible(true);
    setPrePaymentSaleConnector(e);
    setPrePaymentTotalPrice(
      Math.round(
        e.products.reduce((summ, product) => {
          return summ + product.totalprice;
        }, 0) * 10000
      ) / 10000
    );
    setPrePaymentTotalPriceUzs(
      Math.round(
        e.products.reduce((summ, product) => {
          return summ + product.totalpriceuzs;
        }, 0) * 10000
      ) / 10000
    );
    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (e.products.reduce((summ, product) => {
            return summ + product.totalprice;
          }, 0) -
            e.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            e.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0)) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (e.products.reduce((summ, product) => {
            return summ + product.totalpriceuzs;
          }, 0) -
            e.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            e.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0)) *
            10000
        ) / 10000,
    });
  };

  const changeHandlerPrePayment = (e) => {
    let p = { ...prePayment };
    if (e.target.dataset.money === 'UZS') {
      changeTypePrePaymentUzs(e, p);
    } else changeTypePrePayment(e, p);
    setPrePayment(p);
  };

  const typeHandlerPrePayment = (e) => {
    if (e.target.dataset.type === 'debt') return;

    let p = { ...prePayment };
    p.type = e.target.dataset.type;
    if (e.target.dataset.type === 'mixed') {
      setPrePaymentDebt({
        ...prePayment,
        debt:
          Math.round(
            (prePaymentTotalPrice -
              prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0) -
              prePaymentSaleConnector.payments.reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)) *
              10000
          ) / 10000,
        debtuzs:
          Math.round(
            (prePaymentTotalPriceUzs -
              prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                return summ + discount.discountuzs;
              }, 0) -
              prePaymentSaleConnector.payments.reduce((summ, payment) => {
                return summ + payment.paymentuzs;
              }, 0)) *
              10000
          ) / 10000,
      });
    }
    types.map((type) => {
      return type === e.target.dataset.type
        ? ((p[type] =
            Math.round(
              (prePaymentTotalPrice -
                prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0) -
                prePaymentSaleConnector.payments.reduce((summ, payment) => {
                  return summ + payment.payment;
                }, 0)) *
                10000
            ) / 10000),
          (p[type + 'uzs'] =
            Math.round(
              (prePaymentTotalPriceUzs -
                prePaymentSaleConnector.discounts.reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0) -
                prePaymentSaleConnector.payments.reduce((summ, payment) => {
                  return summ + payment.paymentuzs;
                }, 0)) *
                10000
            ) / 10000),
          (p.type = type),
          setPrePaymentDebt({
            ...prePaymentDebt,
            debt: 0,
            debtuzs: 0,
          }))
        : ((p[type] = 0), (p[type + 'uzs'] = 0));
    });
    setPrePayment(p);
    setPrePaymentType({
      type: e.target.dataset.type,
      name: e.target.name,
    });
  };

  const changeTypePrePaymentUzs = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round((e.target.value / exchangerate.exchangerate) * 10000) /
            10000
        : prePayment.transfer);

    const disc = prePaymentSaleConnector.discounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = prePaymentSaleConnector.payments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;

    const totals =
      Math.round((prePaymentTotalPrice - pays - disc) * 10000) / 10000;

    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas!'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      Math.round((e.target.value / exchangerate.exchangerate) * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;

    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (prePaymentTotalPrice -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (prePaymentTotalPriceUzs -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            10000
        ) / 10000,
    });
  };

  const changeTypePrePayment = (e, p) => {
    let total =
      (e.target.dataset.type === 'cash'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.cash) +
      (e.target.dataset.type === 'card'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.card) +
      (e.target.dataset.type === 'transfer'
        ? e.target.value === ''
          ? 0
          : Math.round(e.target.value * 10000) / 10000
        : prePayment.transfer);

    const disc = prePaymentSaleConnector.discounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);
    const pays = prePaymentSaleConnector.payments.reduce((summ, payment) => {
      return summ + payment.payment;
    }, 0);
    const val = Math.round(e.target.value * 10000) / 10000;

    const totals =
      Math.round((prePaymentTotalPrice - pays - disc) * 10000) / 10000;
    if (
      (totals > 0 && val < 0) ||
      (totals < 0 && val > 0) ||
      (totals < 0 && Math.round(total * 10000) / 10000 < totals) ||
      (totals > 0 && Math.round(total * 10000) / 10000 > totals)
    ) {
      return notify({
        title: t('Diqqat! Umumiy summadan yuqori summa kiritish mumkin emas'),
        description: '',
        status: 'error',
      });
    }
    p[e.target.dataset.type] =
      e.target.value === '' ? '' : Math.round(e.target.value * 10000) / 10000;
    p[e.target.dataset.type + 'uzs'] =
      Math.round(e.target.value * 10000 * exchangerate.exchangerate) / 10000;
    setPrePaymentDebt({
      ...prePaymentDebt,
      debt:
        Math.round(
          (prePaymentTotalPrice -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.payment;
            }, 0) -
            p.cash -
            p.card -
            p.transfer) *
            10000
        ) / 10000,
      debtuzs:
        Math.round(
          (prePaymentTotalPriceUzs -
            prePaymentSaleConnector.discounts.reduce((summ, discount) => {
              return summ + discount.discountuzs;
            }, 0) -
            prePaymentSaleConnector.payments.reduce((summ, payment) => {
              return summ + payment.paymentuzs;
            }, 0) -
            p.cashuzs -
            p.carduzs -
            p.transferuzs) *
            10000
        ) / 10000,
    });
  };

  const clearDatas = useCallback(() => {
    setPrePaymentVisible(false);
    setPrePaymentSaleConnector({});
    setPrePaymentTotalPrice({});
    setPrePaymentTotalPriceUzs({});
    setPrePayment({
      totalprice: 0,
      totalpriceuzs: 0,
      type: 'cash',
      cash: 0,
      card: 0,
      transfer: 0,
      carduzs: 0,
      cashuzs: 0,
      transferuzs: 0,
      discount: 0,
      discountuzs: 0,
    });
    setPrePaymentType({
      type: 'cash',
      name: 'Naqt',
    });
    setPrePaymentDebt({
      debt: 0,
      debtuzs: 0,
      comment: '',
    });
  }, []);

  const createHandlerPrePayment = useCallback(async () => {
    try {
      const data = await request(
        `/api/sales/saleproducts/payment`,
        'POST',
        {
          market: auth.market._id,
          payment: prePayment,
          saleconnectorid: prePaymentSaleConnector._id,
          user: auth.userId,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      localStorage.setItem('data', data);
      setModal6(false);
      window.scroll({ top: 0 });
      clearDatas();
      getDebts();
      setPrePaymentVisible(false);
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [
    request,
    notify,
    auth,
    prePayment,
    clearDatas,
    prePaymentSaleConnector,
    getDebts,
  ]);

  //=====================================================
  //=====================================================

  //=====================================================
  //=====================================================
  useEffect(() => {
    getDebts();
  }, [getDebts, currentPage, countPage, sendingsearch, startDate, endDate]);

  useEffect(() => {
    getExchangerate();
    return () => setExchangerate({ exchangerate: 0 });
  }, [getExchangerate]);

  //=====================================================
  //=====================================================

  //=====================================================
  //=====================================================

  //=====================================================
  //=====================================================

  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w-[990px]'>
        <TableHeader
          startDate={startDate}
          endDate={endDate}
          changeDate={changeDate}
          getDebtsExcel={getDebtsExcel}
          currentPage={currentPage}
          setPageSize={setPageSize}
          searchDebt={searchDebt}
          setCurrentPage={setCurrentPage}
          debtsCount={debtsCount}
          countPage={countPage}
          keyPressed={searchKeypress}
        />
        <TableHead
          currentDebts={currentDebts}
          setCurrentDebts={setCurrentDebts}
        />
        {currentDebts.map((debt, index) => {
          return (
            <Rows
              key={index}
              index={index}
              debt={debt}
              currentPage={currentPage}
              changePrepayment={changePrepayment}
            />
          );
        })}
        <ul className='tr font-bold text-base'>
          <li className='td col-span-9 text-right border-r'>{t('Jami')}</li>
          <li className='td text-right col-span-3 border-r-2 border-orange-600'>
            {(Math.round(totalDebts * 10000) / 10000).toLocaleString('ru-RU')}{' '}
            <span className='text-orange-600'>USD</span>
          </li>
        </ul>
      </div>

      <div className={prePaymentVisible ? '' : 'hidden'}>
        <PrePaymentCard
          prePaymentComment={prePaymentComment}
          checkHandler={checkPrePayment}
          changeHandler={changeHandlerPrePayment}
          debt={prePaymentDebt}
          typeHandler={typeHandlerPrePayment}
          exchangerate={exchangerate}
          payment={prePayment}
          paymentType={prePaymentType}
          totalprice={prePaymentTotalPrice}
          totalpriceuzs={prePaymentTotalPriceUzs}
          prePaymentSaleConnector={prePaymentSaleConnector}
          prePayment={prePayment}
          setVisible={setPrePaymentVisible}
        />
      </div>

      <Modal
        modal={modal6}
        setModal={setModal6}
        basic={t(`Mijozdan to'lov qabul qilishni tasdiqlaysizmi?`)}
        handler={createHandlerPrePayment}
      />

      <ExcelTable datas={tableExcel} />
    </div>
  );
};
