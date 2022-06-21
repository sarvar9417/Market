import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../../components/Sort';
import { SortDoubleProperty } from '../../../components/SortDoubleProperty';

export const TableHead = ({ currentProducts, setCurrentProducts }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center items-center col-span-1 px-1'>
        {t('Kodi')}
        <div className='btn-group-vertical ml-2'>
          <Sort
            property={'code'}
            data={currentProducts}
            setData={setCurrentProducts}
          />
        </div>
      </li>
      <li className='th border-r flex  items-center justify-center col-span-6'>
        {t('Mahsulot nomi')}
        <Sort
          property={'name'}
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex justify-center items-center col-span-2'>
        {t("Soni - O'.B.")}
        <Sort
          property={'total'}
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex justify-center items-center col-span-2'>
        {t("Narxi")}
        <SortDoubleProperty
          property={'price'}
          innnerProperty='sellingprice'
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
    </ul>
  );
};
