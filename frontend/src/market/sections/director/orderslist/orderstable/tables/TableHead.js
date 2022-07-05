import { t } from 'i18next';
import React from 'react';
import { SortDoubleProperty } from '../../../components/SortDoubleProperty';

export const TableHead = ({ currentOrders, setCurrentOrders }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center items-center col-span-1 px-1'>
        {t('Kodi')}
        <div className='btn-group-vertical ml-2'>
          <SortDoubleProperty
            property={'productdata'}
            innnerProperty={'code'}
            data={currentOrders}
            setData={setCurrentOrders}
          />
        </div>
      </li>
      <li className='th border-r flex  items-center justify-center col-span-4'>
        {t('Mahsulot nomi')}
        <SortDoubleProperty
          property={'productdata'}
          innnerProperty={'name'}
          data={currentOrders}
          setData={setCurrentOrders}
        />
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Mavjud')}
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Buyurtma')}
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Yuborilgan')}
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Qaytarilgan')}
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Narxi')}
      </li>
      <li className='th border-r flex justify-center items-center'>
        {t('Saqlash')}
      </li>
    </ul>
  );
};
