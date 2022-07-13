import React from 'react';
import { Sort } from '../../../components/Sort';

export const TableHead = ({
  currentPayments,
  setCurrentPayments,
  isAbleDelete,
}) => {
  if (!isAbleDelete) {
    return (
      <ul className='thead shadow-xl'>
        <li className='th border-r'>№</li>
        <li className='th border-r col-span-1 flex justify-center'>
          Sana
          <Sort
            property={'createdAt'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th border-r col-span-4 flex justify-center'>
          Summa
          <Sort
            property={'name'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th border-r col-span-4 flex justify-center'>
          Izoh
          <Sort
            property={'payments'}
            data={currentPayments}
            setData={setCurrentPayments}
          />
        </li>
        <li className='th col-span-2 border-r flex justify-center'>
          Turi
          <Sort
            property={'cash'}
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
      <li className='th border-r col-span-1 flex justify-center'>
        Sana
        <Sort
          property={'createdAt'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th border-r col-span-3 flex justify-center'>
        Summa
        <Sort
          property={'name'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th border-r col-span-4 flex justify-center'>
        Izoh
        <Sort
          property={'payments'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-2 border-r flex justify-center'>
        Turi
        <Sort
          property={'cash'}
          data={currentPayments}
          setData={setCurrentPayments}
        />
      </li>
      <li className='th col-span-1 border-r flex justify-center'>Ochirirsh</li>
    </ul>
  );
};
