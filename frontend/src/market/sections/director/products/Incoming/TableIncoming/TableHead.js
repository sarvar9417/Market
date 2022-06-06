import { t } from 'i18next';
import React from 'react';
import { SortDoubleProperty } from '../../../components/SortDoubleProperty';
import { Sort } from '../../../components/Sort';
export const TableHead = ({ currentImport, setCurrentInports }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r'>
        {t('Yetkazib beruvchi')}
        <SortDoubleProperty
          property={'supplier'}
          innnerProperty={'name'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r'>
        {t('Kodi')}
        <SortDoubleProperty
          property={'category'}
          innnerProperty={'code'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-4'>
        {t('Mahsulot turi va nomi')}{' '}
        <SortDoubleProperty
          property={'product'}
          innnerProperty={'name'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r'>
        {t('Brand')}{' '}
        <SortDoubleProperty
          property={'brand'}
          innnerProperty={'name'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r'>
        {t('Soni')}{' '}
        <Sort
          property={'pieces'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r'>
        {t('Narxi')}
        <Sort
          property={'unitprice'}
          data={currentImport}
          setData={setCurrentInports}
        />
      </li>
      <li className='th border-r col-span-2'>
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
