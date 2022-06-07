import { t } from 'i18next';
import React from 'react';
import { Sort } from '../productComponents/Sort';

export const TableHead = ({ currentUnits, setCurrentUnits }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-7 flex justify-center'>
        {t("O'lchov birligi nomi")}
        <Sort property={'name'} data={currentUnits} setData={setCurrentUnits} />
      </li>
      <li className='th col-span-2 border-r'>{t('Tahrirlash')}</li>
      <li className='th col-span-2'>{t("O'chirish")}</li>
    </ul>
  );
};
