import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentPayments, setCurrentPayments }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t('Ismi')}
        <Sort
          property={'firsname'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>

      <li className='th border-r col-span-3 flex justify-center'>
        {t('Familiyasi')}{' '}
        <Sort
          property={'lastname'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Telefon raqami')}
        <Sort
          property={'phone'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Login')}
        <Sort
          property={'login'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Tahrirlash')}
      </li>
    </ul>
  );
};
