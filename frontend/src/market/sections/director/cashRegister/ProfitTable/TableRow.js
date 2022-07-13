import React from 'react';

export const TableRow = ({ profit, index, currentPage }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-1 td border-r font-bold text-center'>
        {new Date(profit.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-2 border-r text-left'>
        {profit.id && profit.id}
      </li>
      <li className='td col-span-2 border-r text-right'>
        {(
          profit.totalincomingprice && profit.totalincomingprice
        ).toLocaleString('de-DE')}{' '}
        USD
      </li>
      <li className='td  col-span-2 border-r text-right'>
        {(profit.totalsellingprice || 0).toLocaleString('de-DE')}{' '}
        <span className=''>USD</span>
      </li>
      <li className='td col-span-2 border-r text-right'>
        {(profit.discount || 0).toLocaleString('de-DE')}{' '}
        <span className=''>USD</span>
      </li>
      <li className='td col-span-2 border-r text-right'>
        {(profit.profit || 0).toLocaleString('de-DE')}{' '}
        <span className=''>USD</span>
      </li>
    </ul>
  );
};
