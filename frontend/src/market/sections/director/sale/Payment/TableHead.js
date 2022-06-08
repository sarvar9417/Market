import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentPayments, setCurrentPayments }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2 flex justify-center'>
        Sana
        <Sort
          property={'createdAt'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>

      <li className='th border-r col-span-3 flex justify-center'>
        {t('Mijoz')}{' '}
        <Sort
          property={'name'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Naqt')} USD{' '}
        <Sort
          property={'cash'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Plastik')} USD{' '}
        <Sort
          property={'card'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t("O'tkazma")} USD{' '}
        <Sort
          property={'transfer'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
    </ul>
  );
};
