import { t } from 'i18next';
import React from 'react';

export const Header = ({ auth, sales }) => {
  return (
    <div className='grid grid-cols-3 items-center'>
      <div className='flex flex-col'>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Do'kon")}:</span>{' '}
          <span>{auth.market.name}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Telefon")}:</span>{' '}
          <span>+998 {auth.market.phone1}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Manzil")}:</span>{' '}
          <span>{auth.market.address}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Sana")}:</span>
          <span>{new Date(sales.createdAt).toLocaleDateString()}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Mijoz:</span>
          <span>{sales.client && sales.client.name && sales.client.name}</span>
        </p>
      </div>
      <div>
        <div className='text-center text-xl font-bold'>
          Sotuv: A{sales.saleconnector && sales.saleconnector.id}
        </div>
        <div className='text-center text-xl font-bold'>{t("Check")}: {sales.id}</div>
      </div>
      <div className='text-right text-2xl font-bold '>PIPE HOUSE</div>
    </div>
  );
};
