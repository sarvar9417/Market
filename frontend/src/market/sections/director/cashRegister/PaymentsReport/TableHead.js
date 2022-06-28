import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';

export const TableHead = ({ currentPayments, setCurrentPayments, type }) => {
  if (type === 'allpayments') {
    return (
      <ul className='thead shadow-xl'>
        <li className='th border-r'>№</li>
        <li className='th border-r col-span-2 flex justify-center'>
          {t("Sana")}
          <Sort
            property={'createdAt'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>

        <li className='th border-r col-span-2 flex justify-center'>
          {t('Mijoz')}{' '}
          <Sort
            property={'name'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th border-r col-span-2 flex justify-center'>
          Umumiy
          <Sort
            property={'payments'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th col-span-2 border-r flex justify-center'>
          {t('Naqt')}
          <Sort
            property={'cash'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th col-span-2 border-r flex justify-center'>
          {t('Plastik')}
          <Sort
            property={'card'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th col-span-2 border-r flex justify-center'>
          {t("O'tkazma")}
          <Sort
            property={'transfer'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
      </ul>
    );
  }
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r col-span-2 flex justify-center'>
        {t("Sana")}
        <Sort
          property={'createdAt'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>

      <li className='th border-r col-span-5 flex justify-center'>
        {t('Mijoz')}{' '}
        <Sort
          property={'name'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-4 border-r flex justify-center'>
        {(type === 'cash' && t('Naqt')) ||
          (type === 'card' && t('Plastik')) ||
          (type === 'transfer' && t("O'tkazma"))}{' '}
        USD{' '}
        <Sort
          property={type}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
    </ul>
  );
};
