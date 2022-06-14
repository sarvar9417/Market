import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentDiscounts, setCurrentDiscounts }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2 flex justify-center'>
        Sana
        <Sort
          property={'createdAt'}
          data={currentDiscounts}
          setData={setCurrentDiscounts}
        />
      </li>

      <li className='th border-r col-span-3 flex justify-center'>
        {t('Mijoz')}{' '}
        <Sort
          property={'name'}
          data={currentDiscounts}
          setData={setCurrentDiscounts}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Jami')} USD
        <Sort
          property={'totalprice'}
          data={currentDiscounts}
          setData={setCurrentDiscounts}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Chegirma')} USD{' '}
        <Sort
          property={'discount'}
          data={currentDiscounts}
          setData={setCurrentDiscounts}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('Chegirma')} %{' '}
        <Sort
          property={'procient'}
          data={currentDiscounts}
          setData={setCurrentDiscounts}
        />
      </li>
    </ul>
  );
};
