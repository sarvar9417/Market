import React from 'react';

export const Rows = ({ currentPage, index, debt }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {new Date(debt.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-4 border-r text-left'>
        {debt.client && debt.client.name}
      </li>
      <li className='td  col-span-2  text-right border-r'>{debt.id}</li>
      <li className='td  col-span-3  text-right border-r-2 border-r-orange-600'>
        {(Math.round(debt.debt * 100) / 100).toLocaleString('ru-RU')}{' '}
        <span className='text-orange-600'>USD</span>
      </li>
    </ul>
  );
};
