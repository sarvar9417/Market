import { faMoneyCheckDollar, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';

export const Footer = ({
  currency,
  saveTemporary,
  totalprice,
  discount,
  debt,
  payment,
  setVisible,
  totalpriceuzs,
}) => {
  return (
    <div className='grid grid-cols-12 text-lg font-bold p-2 min-w-[700px]'>
      <div className='col-span-6 flex flex-col'>
        <span className='text-black font-bold'>{t('Umumiy summa:')}</span>
        <span className='text-black font-bold'>{t('Chegirma')}:</span>
        <span className='text-black font-bold'>{t('Qarz')}:</span>
        <span className='text-black font-bold'>{t("To'lanayotgan")}:</span>
      </div>
      <div className='col-span-4 flex flex-col text-right'>
        <span className=''>
          {currency === 'UZS'
            ? totalpriceuzs.toLocaleString('ru-RU')
            : totalprice.toLocaleString('ru-RU')}{' '}
          <span className='text-green-800'>{currency}</span>
        </span>
        <span className=''>
          {currency === 'UZS'
            ? discount.discountuzs.toLocaleString('ru-RU')
            : discount.discount.toLocaleString('ru-RU')}{' '}
          <span className='text-green-800'>{currency}</span>
        </span>
        <span className=''>
          {currency === 'UZS'
            ? debt.debtuzs.toLocaleString('ru-RU')
            : debt.debt.toLocaleString('ru-RU')}{' '}
          <span className='text-green-800'>{currency}</span>
        </span>
        <span className=''>
          {currency === 'UZS'
            ? (
                payment.cashuzs +
                payment.carduzs +
                payment.transferuzs
              ).toLocaleString('ru-RU')
            : (payment.cash + payment.card + payment.transfer).toLocaleString(
                'ru-RU'
              )}{' '}
          <span className='text-green-800'>{currency}</span>
        </span>
      </div>
      <div className='font-bold  col-span-2 text-center py-2 px-3'>
        <button
          onClick={() => setVisible(true)}
          className='w-full  bg-green-800 text-white rounded hover:bg-green-700 py-2 text-2xl mb-2'>
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
        </button>
        <button
          onClick={saveTemporary}
          className='w-full  bg-orange-800 text-white rounded hover:bg-orange-700 py-2 text-2xl'>
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
    </div>
  );
};
