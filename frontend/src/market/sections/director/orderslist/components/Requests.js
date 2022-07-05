import { useCallback, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useHttp } from '../../../../hooks/http.hook';
import { Notify } from '../../components/Notify';

export const Requests = () => {
  const { request } = useHttp();

  const notify = Notify().notify;

  const auth = useContext(AuthContext);

  const getOrdersList = useCallback(
    async ({ setOrdersList, beginDay, endDay }) => {
      try {
        const data = await request(
          `/api/connections/getordersmarket`,
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

  const updateOrderConnector = useCallback(
    async ({
      setOrdersList,
      beginDay,
      endDay,
      orderConnector,
      position,
      setPosition,
      setModal,
    }) => {
      try {
        const data = await request(
          `/api/connections/updateordersconnector`,
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
        setModal(false);
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
      setPosition,
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
          `/api/connections/getorderproductsmarket`,
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
        setPosition(data.position);
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

  const updateOrderProducts = useCallback(
    async ({
      setPosition,
      orderConnector,
      countPage,
      currentPage,
      setCurrentOrders,
      setOrders,
      setOrdersCount,
      sendingsearch,
      order,
    }) => {
      try {
        const data = await request(
          `/api/connections/updateorderproductsmarket`,
          'POST',
          {
            order,
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
        setPosition(data.position);
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
    getOrdersList,
    getOrderProducts,
    updateOrderConnector,
    updateOrderProducts,
  };
};
