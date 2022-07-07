import { t } from 'i18next';
import { useCallback, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useHttp } from '../../../../hooks/http.hook';
import { Notify } from '../../components/Notify';

export const Requests = () => {
  const { request } = useHttp();

  const notify = Notify().notify;

  const auth = useContext(AuthContext);

  const getProducts = useCallback(
    async (
      setCurrentProducts,
      setSearchStorage,
      currentPage,
      countPage,
      sendingsearch,
      setProducts,
      setProductsCount,
      market
    ) => {
      try {
        const data = await request(
          `/api/products/product/getproducts`,
          'POST',
          {
            market,
            currentPage,
            countPage,
            search: sendingsearch,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setSearchStorage(data.products);
        setCurrentProducts(data.products);
        setProducts(data.products);
        setProductsCount(data.count);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const registerOrderProducts = useCallback(
    async ({ setProducts }) => {
      try {
        const data = await request(
          `/api/products/product/getallincoming`,
          'POST',
          {
            market:
              auth.market && auth.market.mainmarket && auth.market.mainmarket,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        let s = [
          {
            label: t('Barcha mahsulotlar'),
            value: 'all',
          },
        ];
        data.map((product) => {
          return s.push({
            label:
              '(' +
              product.total +
              ') ' +
              product.productdata.code +
              ' ' +
              product.productdata.name,
            value: product._id,
            product: { ...product },
          });
        });
        setProducts(s);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const registerOrders = useCallback(
    async ({ orders, beginDay, endDay, setOrdersList }) => {
      try {
        const data = await request(
          `/api/connections/registerorders`,
          'POST',
          {
            market: auth.market._id,
            orders,
            startDate: beginDay,
            endDate: endDay,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setOrdersList(data);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const getOrdersList = useCallback(
    async ({ setOrdersList, beginDay, endDay }) => {
      try {
        const data = await request(
          `/api/connections/getorders`,
          'POST',
          {
            market: auth.market._id,
            startDate: beginDay,
            endDate: endDay,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setOrdersList(data);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const getOrderProducts = useCallback(
    async ({
      orderConnector,
      countPage,
      currentPage,
      setCurrentOrders,
      setOrders,
      setOrdersCount,
      sendingsearch,
    }) => {
      try {
        const data = await request(
          `/api/connections/getorderproducts`,
          'POST',
          {
            orderConnector,
            countPage,
            currentPage,
            search: sendingsearch,
            market: auth.market._id,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setOrders(data.orders);
        setCurrentOrders(data.orders);
        setOrdersCount(data.count);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  const updateOrderConnector = useCallback(
    async ({
      setOrdersList,
      beginDay,
      endDay,
      orderConnector,
      position,
      setPosition,
      setModal3,
    }) => {
      try {
        const data = await request(
          `/api/connections/updateorderconnector`,
          'POST',
          {
            market: auth.market._id,
            startDate: beginDay,
            endDate: endDay,
            orderConnector,
            position,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setOrdersList(data.orders);
        setPosition(data.position);
        setModal3(false);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, auth, notify]
  );

  return {
    getProducts,
    registerOrderProducts,
    registerOrders,
    getOrdersList,
    getOrderProducts,
    updateOrderConnector,
  };
};
