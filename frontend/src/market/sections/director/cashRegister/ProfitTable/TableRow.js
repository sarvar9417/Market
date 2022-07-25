import React from 'react';

export const TableRow = ({ profit, index, currentPage, currency }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-1 td border-r font-bold text-center'>
        {new Date(profit.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-2 border-r text-right'>
        {profit.id && profit.id}
      </li>
      <li className='td col-span-2 border-r-2 text-right border-orange-600'>
        {currency === 'UZS'
          ? profit.totalincomingpriceuzs.toLocaleString('ru-RU')
          : profit.totalincomingprice.toLocaleString('ru-RU')}{' '}
        {currency}
      </li>
      <li className='td  col-span-2 border-r-2 text-right border-orange-600'>
        {currency === 'UZS'
          ? profit.totalsellingpriceuzs.toLocaleString('ru-RU')
          : profit.totalsellingprice.toLocaleString('ru-RU')}{' '}
        <span className=''>{currency}</span>
      </li>
      <li className='td col-span-2 border-r-2 text-right border-red-600 '>
        {currency === 'UZS'
          ? profit.discountuzs.toLocaleString('ru-RU')
          : profit.discount.toLocaleString('ru-RU')}{' '}
        <span className=''>{currency}</span>
      </li>
      <li className='td col-span-2 border-green-700 border-r-2 text-right text-green-900'>
        {currency === 'UZS'
          ? profit.profituzs.toLocaleString('ru-RU')
          : profit.profit.toLocaleString('ru-RU')}{' '}
        <span className=''>{currency}</span>
      </li>
    </ul>
  );
};
