import {
  faAdd,
  faIdCard,
  faShoppingCart,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { Currency } from '../../components/Currency';

export const RouterBtns = ({
  currency,
  changeCurrency,
  changeVisibleTemporary,
  changeVisible,
  changeVisibleTable,
  changeVisibleReport,
}) => {
  return (
    <div className='flex flex-col md:justify-between items-center md:flex-row justify-center'>
      <div className='m-3 '>
        <div className='font-bold text-right'>
          Asosiy valyuta turi:{' '}
          <Currency
            value={currency === 'UZS' ? true : false}
            onToggle={changeCurrency}
          />
        </div>
      </div>
      <div className='flex-col justify-end m-3 flex sm:flex-row w-full max-w-lg'>
        <button
          className={`bg-darkblue-400 hover:bg-darkblue-500 px-2 py-1 text-white font-bold rounded-2xl flex ml-2 my-2 sm:my-0 sm:ml-0`}
          onClick={changeVisible}>
          <span className='w-[20px] h-[20px] bg-white text-darkblue-500 flex items-center justify-center mr-1 rounded-full'>
            <FontAwesomeIcon icon={faAdd} />
          </span>{' '}
          {t('Qabul qilish')}
        </button>
        <button
          onClick={changeVisibleReport}
          className='bg-orange-700 hover:bg-orange-800 px-2 py-1 text-white font-bold rounded-2xl flex ml-2 my-2 sm:my-0'>
          <span className='w-[20px] h-[20px] bg-white text-orange-700 flex items-center justify-center mr-1 rounded-full'>
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>{' '}
          {t('Qabullar')}
        </button>
        <button
          onClick={changeVisibleTemporary}
          className='bg-red-600 hover:bg-red-700 px-2 py-1 text-white font-bold rounded-2xl flex ml-2 my-2 sm:my-0'>
          <span className='w-[20px] h-[20px] bg-white text-red-600 flex items-center justify-center mr-1 rounded-full'>
            <FontAwesomeIcon icon={faIdCard} />
          </span>{' '}
          {t('Saqlanganlar')}
        </button>
        <button
          onClick={changeVisibleTable}
          className='bg-green-700 hover:bg-green-800 px-2 py-1 text-white font-bold rounded-2xl flex ml-2 my-2 sm:my-0 sm:ml-0'>
          <span className='w-[20px] h-[20px] bg-white text-green-700 flex items-center justify-center mr-1 rounded-full'>
            <FontAwesomeIcon icon={faTable} />
          </span>{' '}
          {t("Ro'yxat")}
        </button>
      </div>
    </div>
  );
};
