import React from 'react';

export const Rows = ({ currentPage, index, payment, type }) => {
  if (type === 'allpayments') {
    return (
      <>
        <ul className='tr font-bold'>
          <li className='no'>{currentPage * 10 + 1 + index}</li>
          <li className='col-span-2 td border-r font-bold text-right  flex justify-between'>
            <span>{new Date(payment.createdAt).toLocaleTimeString()} </span>
            <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
          </li>
          <li className='td col-span-3 border-r text-left'>
            {payment.client && payment.client}
          </li>
          <li className='td  col-span-2  text-right border-r-2 border-r-green-800'>
            {(Math.round(payment.cash * 10000) / 10000).toLocaleString('ru-RU')}{' '}
            <span className='text-green-800'>USD</span>
          </li>
          <li className='td  col-span-2  text-right border-r-2 border-r-orange-600'>
            {(Math.round(payment.card * 10000) / 10000).toLocaleString('ru-RU')}{' '}
            <span className='text-orange-600'>USD</span>
          </li>
          <li className='td col-span-2 text-right border-r-2 border-r-red-600'>
            {(Math.round(payment.transfer * 10000) / 10000).toLocaleString(
              'ru-RU'
            )}{' '}
            <span className='text-red-600'>USD</span>
          </li>
        </ul>
      </>
    );
  }
  return (
    <>
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
          {(payment.payment || 0).toLocaleString('de-DE')}{' '}
          <span className='text-orange-600'>USD</span>
        </li>
      </ul>
    </>
  );
};
