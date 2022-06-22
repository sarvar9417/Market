import { t } from 'i18next';
import React from 'react';
// import { Sort } from '../productComponents/Sort';

export const TableHead = ({ currentBrands, setCurrentBrands }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r'>{t('Kodi')}</li>
      <li className='th border-r col-span-3'>{t('Nomi')}</li>
      <li className='th border-r'>{t('Dastlabki')}</li>
      <li className='th  border-r'>{t('Sanoq')}</li>
      <li className='th  border-r col-span-2'>{t('Farq')}</li>
      <li className='th  border-r col-span-2'>{t('Izoh')}</li>
      <li className='th  border-r'>{t('Saqlash')}</li>
    </ul>
  );
};
