import { useCallback, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useHttp } from '../../../../hooks/http.hook';
import { Notify } from './Notify';

export const Requests = () => {
  const { request } = useHttp();

  const notify = Notify().notify;

  const auth = useContext(AuthContext);

  const getFilials = useCallback(
    async (setFilials) => {
      try {
        const data = await request(
          `/api/connections/getfilials`,
          'POST',
          {
            market: auth.market,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setFilials(data);
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

  const getProductExcel = useCallback(
    async (sendingsearch, setExcelDatas, market) => {
      try {
        const data = await request(
          '/api/products/product/getexceldata',
          'POST',
          {
            market,
            search: sendingsearch,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setExcelDatas(data);
        document.getElementById('reacthtmltoexcel').click();
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [auth, request, notify]
  );

  const getSaleConnectors = useCallback(
    async (
      countPage,
      currentPage,
      startDate,
      endDate,
      sendingsearch,
      setSaleCounts,
      setCurrentProducts,
      setSaleConnectors,
      market
    ) => {
      try {
        const data = await request(
          `/api/sales/saleproducts/getconnectors`,
          'POST',
          {
            market,
            currentPage,
            countPage,
            startDate,
            endDate,
            search: sendingsearch,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setSaleCounts(data.count);
        setCurrentProducts(data.saleconnectors);
        setSaleConnectors(data.saleconnectors);
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

  const getSaleConnectorsExcel = useCallback(
    async (startDate, endDate, sendingsearch, setExcelTable, market) => {
      try {
        const data = await request(
          `/api/sales/saleproducts/getconnectorsexcel`,
          'POST',
          {
            market,
            startDate,
            endDate,
            search: sendingsearch,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setExcelTable(data.saleconnectors);
        document.getElementById('reacthtmltoexcelsales').click();
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

  // GETDATA
  const getPayments = useCallback(
    async (
      currentPage,
      countPage,
      sendingsearch,
      startDate,
      endDate,
      setCurrentPayments,
      setSearchStorage,
      setPaymentsCount,
      setTotalPayments,
      market
    ) => {
      try {
        const data = await request(
          '/api/sales/payments/get',
          'POST',
          {
            market,
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
        setCurrentPayments(data.payments);
        setSearchStorage(data.payments);
        setPaymentsCount(data.count);
        setTotalPayments(data.total);
      } catch (error) {
        notify({
          title: error,
          description: '',
          status: 'error',
        });
      }
    },
    [auth, request, notify]
  );

  const getPaymentsExcel = async (
    setTableExcel,
    sendingsearch,
    startDate,
    endDate,
    market
  ) => {
    try {
      const data = await request(
        '/api/sales/payments/getexcel',
        'POST',
        {
          market,
          search: sendingsearch,
          startDate,
          endDate,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTableExcel(data);
      document.getElementById('reacthtmltoexcelpayments').click();
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  };

  return {
    getFilials,
    getProducts,
    getProductExcel,
    getSaleConnectors,
    getSaleConnectorsExcel,
    getPayments,
    getPaymentsExcel,
  };
};
