import { t } from 'i18next';
import React from 'react';
import { SortDoubleProperty } from '../../../components/SortDoubleProperty';
import { Sort } from '../../../components/Sort';
export const TableHead = ({ currentImport, setCurrentInports }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r flex justify-center items-center'>№</li>
      <li className='th border-r flex justify-center items-center'>
        {t('Brand')}
        <SortDoubleProperty
          property={'supplier'}
          innnerProperty={'name'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Kodi')}
        <SortDoubleProperty
          property={'product'}
          innnerProperty={'code'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-3 flex justify-center items-center'>
        {t('Mahsulot nomi')}{' '}
        <SortDoubleProperty
          property={'product'}
          innnerProperty={'name'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-2 flex justify-center items-center'>
        {t('Soni')}{' '}
        <Sort
          property={'pieces'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-2 flex justify-center items-center'>
        {t('Narxi')}
        <Sort
          property={'unitprice'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-2 flex justify-center items-center'>
        {t('Jami')}{' '}
        <Sort
          property={'totalprice'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
    </ul>
  );
};
