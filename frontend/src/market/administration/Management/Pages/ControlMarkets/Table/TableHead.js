import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../../../../sections/director/components/Sort';
import { SortDoubleProperty } from '../../../../../sections/director/components/SortDoubleProperty';

export const TableHead = ({ currentMarkets, setCurrentMarkets }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r'>Logotip</li>
      <li className='th border-r flex justify-center col-span-2'>
        {t("Do'kon nomi")}
        <Sort
          property={'name'}
          data={currentMarkets}
          setData={setCurrentMarkets}
        />
      </li>
      <li className='th border-r col-span-3 flex justify-center'>
        {t('Direktor')}
        <SortDoubleProperty
          property={'director'}
          innnerProperty='firstname'
          data={currentMarkets}
          setData={setCurrentMarkets}
        />
      </li>
      <li className='th col-span-2 border-r'>{t('Telefon')}</li>
      <li className='th border-r'>{t('Aloqa')}</li>
      <li className='th border-r'>{t('Filial')}</li>
      <li className='th'>{t('Saqlash')}</li>
    </ul>
  );
};
