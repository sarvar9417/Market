import { t } from 'i18next';
import React from 'react';

export const Header = ({ auth, client, sales }) => {
  console.log(auth);
  return (
    <div className='grid grid-cols-6 px-4 gap-x-4 items-center'>
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
          <span className='font-bold'>{t('Mijoz')}:</span>{' '}
          <span>{sales.client && sales.client.name}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>{t('Sana')}:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </p>
      </div>
      <div className='px-4 col-span-4  grid grid-rows-2'>
        <div className='flex justify-between items-center mb-2'>
          <div className='text-center text-xl font-bold'>
            {/* {t('Sotuv')}: A{sales.id} */}
          </div>
          <div className='text-right text-2xl font-bold uppercase'>
            {auth.market.name}
          </div>
        </div>
        <div className='flex justify-end items-center'>
          <div className='text-center  font-bold'>Sotuvchi:</div>
          <div className='text-right font-bold'>
            {auth.user.firstname} {auth.user.lastname}
          </div>
        </div>
      </div>
    </div>
  );
};
