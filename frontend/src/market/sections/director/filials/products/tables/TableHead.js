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
      <li className='th border-r flex  items-center justify-center col-span-3'>
        {t('Mahsulot nomi')}
        <Sort
          property={'name'}
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex flex-column items-center col-span-1'>
        {t("Soni - O'.B.")}
        <Sort
          property={'total'}
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex flex-column items-center col-span-1'>
        {t('Olish')}
        <SortDoubleProperty
          property={'price'}
          innnerProperty='incomingprice'
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex flex-column items-center col-span-2'>
        Olish jami
        <SortDoubleProperty
          property={'price'}
          innnerProperty='incomingprice'
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex flex-column items-center col-span-1'>
        {t('Sotish')}
        <SortDoubleProperty
          property={'price'}
          innnerProperty='sellingprice'
          data={currentProducts}
          setData={setCurrentProducts}
        />
      </li>
      <li className='th border-r flex flex-column items-center col-span-2'>
        Sotish jami
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
