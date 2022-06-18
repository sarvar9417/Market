import React from 'react';

export const Rows = ({ currentPage, index, payment, type }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {new Date(payment.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-5 border-r text-left'>
        {payment.saleconnector &&
          payment.saleconnector.client &&
          payment.saleconnector.client.name}
      </li>
      <li className='td  col-span-4  text-right border-r-2 border-r-orange-600'>
        {(
          (type === 'cash' && payment.cash) ||
          (type === 'card' && payment.card) ||
          (type === 'transfer' && payment.transfer)
        ).toLocaleString('de-DE')}{' '}
        <span className='text-orange-600'>USD</span>
      </li>
    </ul>
  );
};
