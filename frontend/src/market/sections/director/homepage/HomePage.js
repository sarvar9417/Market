import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { useToast } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../../loader/Loader';
import { t } from 'i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const HomePage = () => {
  //=============================================================
  //=============================================================

  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  //=============================================================
  //=============================================================

  //=============================================================
  //=============================================================

  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ];

  //=============================================================
  //=============================================================

  //=============================================================
  //=============================================================

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

  //=============================================================
  //=============================================================

  //=============================================================
  //=============================================================

  const [incomingPrice, setIncomingPrice] = useState([]);
  const [sellingPrice, setSellingPrice] = useState([]);

  const getIncomingCharts = useCallback(async () => {
    try {
      if (auth.market) {
        const data = await request(
          '/api/chart/getincoming',
          'POST',
          {
            market: auth.market && auth.market._id,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data.map((item) => {
          let indx = new Date(item.createdAt).getMonth();
          return (arr[indx] =
            arr[indx] > 0 ? arr[indx] + item.totalprice : item.totalprice);
        });
        setIncomingPrice(arr.slice(0, new Date().getMonth() + 1));
      }
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);

  const getSellingCharts = useCallback(async () => {
    try {
      if (auth.market) {
        const data = await request(
          '/api/chart/getselling',
          'POST',
          {
            market: auth.market && auth.market._id,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data.map((item) => {
          let indx = new Date(item.createdAt).getMonth();
          return (arr[indx] =
            arr[indx] > 0 ? arr[indx] + item.totalprice : item.totalprice);
        });
        setSellingPrice(arr.slice(0, new Date().getMonth() + 1));
      }
    } catch (error) {
      notify({
        title: error,
        description: '',
        status: 'error',
      });
    }
  }, [auth, request, notify]);

  //=============================================================
  //=============================================================

  useEffect(() => {
    getIncomingCharts();
    getSellingCharts();
  }, [getIncomingCharts, getSellingCharts]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='container py-2'>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: t('Keltirilgan va sotilgan mahsulotlar'),
            },
          },
        }}
        datasetIdKey='id'
        data={{
          labels: months.splice(0, new Date().getMonth() + 1),
          datasets: [
            {
              id: 1,
              label: t('Keltirilgan'),
              data: incomingPrice,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              id: 2,
              label: t('Sotilgan'),
              data: sellingPrice,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        }}
      />
    </div>
  );
};
