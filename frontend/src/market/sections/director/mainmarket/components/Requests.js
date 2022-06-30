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

  const getOrderProducts = useCallback(
    async (setProducts, setAllProducts) => {
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
        setAllProducts(s);
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
    getOrderProducts,
  };
};
