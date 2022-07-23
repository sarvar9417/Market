import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ sales, setSales, type }) => {
  const types = { cash: 'Naqt', card: 'Plastik', transfer: "O'tkazma" };
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-1 flex justify-center'>
        {t('Sana')}
        <Sort property={'createdAt'} data={sales} setData={setSales} />
      </li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t('Id')} <Sort property={'name'} data={sales} setData={setSales} />
      </li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t('Mijoz')} <Sort property={'name'} data={sales} setData={setSales} />
      </li>
      <li className='th border-r col-span-3 flex justify-center'>
        {t('Sotuv')}
        <Sort property={'payments'} data={sales} setData={setSales} />
      </li>
      <li className='th col-span-3 border-r flex justify-center'>
        {t(types[type])}
        <Sort property={'cash'} data={sales} setData={setSales} />
      </li>
    </ul>
  );
};
