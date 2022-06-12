import { t } from 'i18next';
import React from 'react';
import { Sort } from '../Product/Sort';

export const TableHead = ({ currentSuppliers, setCurrentSuppliers }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>

      <li className='th border-r col-span-7 flex justify-center'>
        {t('Yetkazib beruvchi nomi')}{' '}
        <Sort
          property={'name'}
          data={currentSuppliers}
          setData={setCurrentSuppliers}
        />
      </li>
      <li className='th col-span-2 border-r'>{t('Tahrirlash')}</li>
      <li className='th col-span-2'>{t("O'chirish")}</li>
    </ul>
  );
};
