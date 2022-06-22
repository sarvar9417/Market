import React from 'react';

export const Rows = ({ currentPage, index, discount }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {new Date(discount.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-3 border-r text-left'>
        {discount.saleconnector &&
          discount.saleconnector.client &&
          discount.saleconnector.client.name}
      </li>
      <li className='td  col-span-2  text-right border-r-2 border-r-green-800'>
        {(Math.round(discount.totalprice * 10000) / 10000).toLocaleString(
          'ru-RU'
        )}{' '}
        <span className='text-green-800'>USD</span>
      </li>
      <li className='td  col-span-2  text-right border-r-2 border-r-orange-600'>
        {(Math.round(discount.discount * 10000) / 10000).toLocaleString(
          'ru-RU'
        )}{' '}
        <span className='text-orange-600'>USD</span>
      </li>
      <li className='td  col-span-2  text-right border-r-2 border-r-orange-600'>
        {(Math.round(discount.procient * 10000) / 10000).toLocaleString(
          'ru-RU'
        )}{' '}
        <span className='text-orange-600'>%</span>
      </li>
    </ul>
  );
};
