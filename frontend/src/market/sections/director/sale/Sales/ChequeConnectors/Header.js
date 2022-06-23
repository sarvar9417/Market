import { t } from 'i18next';
import React from 'react';

export const Header = ({ auth, sales }) => {
  return (
    <div className='grid grid-cols-6 gap-x-4 items-center'>
      <div className='col-span-2 flex flex-col'>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Do'kon")}:</span>{' '}
          <span>{auth.market.name}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Telefon')}:</span>{' '}
          <span>+998 {auth.market.phone1}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Manzil')}:</span>{' '}
          <span>{auth.market.address}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Sana')}:</span>
          <span>{new Date(sales.createdAt).toLocaleDateString()}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Mijoz:</span>
          <span>{sales.client && sales.client[0] && sales.client[0].name}</span>
        </p>
      </div>
      <div className='col-span-4 h-full pl-8 pt-4 flex flex-col justify-between'>
        <div className='flex justify-between items-center'>
          <div className='text-center text-xl font-bold'>
            {t('Sotuv')}: A{sales.id}
          </div>
          <div className='text-right text-2xl font-bold uppercase'>
            {auth.market.name}
          </div>
        </div>
        <div className='flex justify-end'>
          <div>
            <span className='font-bold'>Sotuvchi:</span> {auth.user.firstname}{' '}
            {auth.user.lastname}
          </div>
        </div>
      </div>
    </div>
  );
};
