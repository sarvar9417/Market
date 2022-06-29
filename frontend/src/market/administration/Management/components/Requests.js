import { useCallback, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { Notify } from './Notify';

export const Requests = () => {
  const { request } = useHttp();

  const notify = Notify().notify;

  const auth = useContext(AuthContext);

  const getBaseUrl = useCallback(
    async (setBaseUrl) => {
      try {
        const data = await request('/api/baseurl', 'GET', null);
        setBaseUrl(data.baseUrl);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [request, notify]
  );

  const getMarkets = useCallback(
    async (
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch
    ) => {
      try {
        const data = await request(
          `/api/administrator/getmarkets`,
          'POST',
          {
            administrator: auth.administrator,
            currentPage,
            countPage,
            search: sendingsearch,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setSearchStorage(data.markets);
        setCurrentMarkets(data.markets);
        setMarketsCount(data.count);
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

  const getMarketControls = useCallback(
    async (
      setMarket,
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch,
      marketId
    ) => {
      try {
        const data = await request(
          `/api/administrator/getmarketcontrols`,
          'POST',
          {
            administrator: auth.administrator,
            currentPage,
            countPage,
            search: sendingsearch,
            marketId,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setSearchStorage(data.markets);
        setCurrentMarkets(data.markets);
        setMarketsCount(data.count);
        setMarket(data.market);
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

  const updateMarkets = useCallback(
    async (
      setMarket,
      currentPage,
      countPage,
      setSearchStorage,
      setCurrentMarkets,
      setMarketsCount,
      sendingsearch,
      market,
      filial
    ) => {
      try {
        const data = await request(
          `/api/administrator/updatemarkets`,
          'POST',
          {
            administrator: auth.administrator,
            currentPage,
            countPage,
            search: sendingsearch,
            market,
            filial,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setSearchStorage(data.markets);
        setCurrentMarkets(data.markets);
        setMarketsCount(data.count);
        setMarket(data.market);
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

  const getPermission = useCallback(
    async (setPermission, permissionid) => {
      try {
        const data = await request(
          `/api/administrator/getpermission`,
          'POST',
          {
            permissionid,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        if (data) {
          setPermission(data);
        }
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

  const createPermission = useCallback(
    async (permission, setPermission) => {
      try {
        const data = await request(
          `/api/administrator/registerpermission`,
          'POST',
          {
            permission,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setPermission(data);
        notify({
          title: 'Ruxsatnomalar muvaffaqqiyatli saqlandi',
          description: '',
          status: 'success',
        });
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
    getBaseUrl,
    getMarkets,
    getMarketControls,
    updateMarkets,
    getPermission,
    createPermission,
  };
};
