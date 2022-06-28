import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentDebts, setCurrentDebts }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t("Sana")}
        <Sort
          property={'createdAt'}
          data={currentDebts}
          setData={setCurrentDebts}
        />
      </li>
      <li className='th border-r col-span-4 flex justify-center'>
        {t('Mijoz')}{' '}
        <Sort property={'name'} data={currentDebts} setData={setCurrentDebts} />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        {t('ID')}
        <Sort property={'id'} data={currentDebts} setData={setCurrentDebts} />
      </li>
      <li className='th col-span-3 border-r flex justify-center'>
        {t('Qarz')}
        <Sort property={'debt'} data={currentDebts} setData={setCurrentDebts} />
      </li>
    </ul>
  );
};
