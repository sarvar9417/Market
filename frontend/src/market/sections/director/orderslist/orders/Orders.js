import React from 'react';
import { t } from 'i18next';
import { Datapicker } from '../../components/Datepicker';
import { OrderCard } from './OrderCard';

export const Orders = ({
  setBeginDay,
  setEndDay,
  ordersList,
  setOrderConnector,
}) => {
  return (
    <div className='w-full shadow-lg'>
      <div className='card-header text-lg'>{t('Buyurtmalar')}</div>
      <div className='grid grid-cols-12 p-3 grid-rows-6'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 row-span-6'>
          <div className='xsm:text-center sm:text-start'>
            <Datapicker setBeginDay={setBeginDay} setEndDay={setEndDay} />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          <span>{t('Mahsulotlar turlari:')}</span>{' '}
          <span className='text-blue-900'>
            {ordersList.reduce((summ, order) => {
              return summ + order.products.length;
            }, 0)}
          </span>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          {t('Jami')}:{' '}
          <span className='text-blue-900'>
            {ordersList.reduce((summ, order) => {
              return summ + order.totalprice;
            }, 0)}
          </span>
        </div>
        <OrderCard
          ordersList={ordersList}
          setOrderConnector={setOrderConnector}
        />
      </div>
    </div>
  );
};
