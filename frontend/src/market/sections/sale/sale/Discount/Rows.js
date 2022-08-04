import React from 'react';

export const Rows = ({ currentPage, index, discount, currency }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {new Date(discount.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-3 border-r text-left'>
        {(discount && discount.client && discount.client.name) || discount.id}
      </li>
      <li className='td  col-span-3  text-right border-r-2 border-r-green-800'>
        {currency === 'UZS'
          ? (Math.round(discount.totaluzs * 1) / 1).toLocaleString('ru-RU')
          : (Math.round(discount.total * 1000) / 1000).toLocaleString(
              'ru-RU'
            )}{' '}
        <span className='text-green-800'>{currency}</span>
      </li>
      <li className='td  col-span-3  text-right border-r-2 border-r-orange-600'>
        {currency === 'UZS'
          ? (Math.round(discount.discountuzs * 1) / 1).toLocaleString('ru-RU')
          : (Math.round(discount.discount * 1000) / 1000).toLocaleString(
              'ru-RU'
            )}{' '}
        <span className='text-orange-600'>{currency}</span>
      </li>
    </ul>
  );
};
