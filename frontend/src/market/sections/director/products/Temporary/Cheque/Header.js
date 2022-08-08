import React from 'react';
import { t } from 'i18next';

export const Header = ({ auth, supplier }) => {
  return (
    <div className='grid grid-cols-3 items-center'>
      <div className='flex flex-col'>
        <p className='flex justify-between'>
          <span className='font-bold'>{t("Do'kon")}:</span>{' '}
          <span>{auth.market.name}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Telefon')}:</span>{' '}
          <span>+998 {auth.market.phone1}</span>
        </p>
        <p className='flex justify-between'></p>
        <p className='flex justify-between'></p>
      </div>
      <div className='px-5'>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Yetkazib beruvchi')}:</span>{' '}
          <span>{supplier && supplier.name}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Sana')}:</span>
          <span>
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </span>
        </p>
      </div>
      <div className='text-right text-2xl font-bold '>
        {auth.market && auth.market.name}
      </div>
    </div>
  );
};
