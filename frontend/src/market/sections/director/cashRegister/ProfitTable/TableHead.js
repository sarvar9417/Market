import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentPayments, setCurrentPayments }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-1 flex justify-center'>
        {t('Sana')}
        <Sort
          property={'createdAt'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t('ID')}{' '}
        <Sort
          property={'name'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t('Kelgan narxi')}
        <Sort
          property={'payments'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Sotilgan narxi')}
        <Sort
          property={'cash'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Chegirma')}
        <Sort
          property={'card'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Foyda')}
        <Sort
          property={'transfer'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
    </ul>
  );
};
