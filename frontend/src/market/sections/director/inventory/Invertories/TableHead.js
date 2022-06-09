import { t } from 'i18next';
import React from 'react';
// import { Sort } from '../productComponents/Sort';

export const TableHead = ({ currentBrands, setCurrentBrands }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2'>{t('Sana')}</li>
      <li className='th border-r col-span-2'>{t('ID')}</li>
      <li className='th border-r flex justify-center col-span-2'>
        {t('Mahsulotlar')}{' '}
        {/* <Sort
          property={'name'}
          data={currentBrands}
          setData={setCurrentBrands}
        /> */}
      </li>
      <li className='th  border-r'>{t('Holati')}</li>
      <li className='th col-span-2 border-r'>{t('Edit')}</li>
      <li className='th col-span-2 border-r'>{t('Batafsil')}</li>
    </ul>
  );
};
