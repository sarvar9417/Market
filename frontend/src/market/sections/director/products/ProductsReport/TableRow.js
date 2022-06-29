import React from 'react';

export const TableRow = ({ countPage, p, index, currentPage }) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no text-right px-2'>
        <span className='w-1/2'>{p.productdata.code}</span>
      </li>
      <li className='col-span-5 td font-bold border-r'>{p.productdata.name}</li>
      <li className='col-span-1 td no flex justify-end px-1'>
        <span>{p.total}</span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price && p.price.incomingprice} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {(p.price && p.price.incomingprice) * p.total} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price && p.price.sellingprice} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {(p.price && p.price.sellingprice) * p.total} USD
      </li>
    </ul>
  );
};
