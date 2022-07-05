import React from 'react';

export const TableRow = ({ countPage, p, index, currentPage }) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no text-right px-2'>
        <span className='w-1/2'>{p.productdata.code}</span>
      </li>
      <li className='col-span-4 td font-bold border-r'>{p.productdata.name}</li>
      <li className=' td no flex justify-end px-1'>
        <span>{p.orderpieces.toLocaleString('ru-RU')}</span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className=' td no flex justify-end px-1'>
        <span>
          {(p.sendingpieces && p.sendingpieces.toLocaleString('ru-RU')) || 0}
        </span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='col-span-2 td no flex justify-end px-1'>
        <span>
          {(p.incomingpieces && p.incomingpieces.toLocaleString('ru-RU')) || 0}
        </span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='col-span-2 td no flex justify-end px-1'>
        <span>
          {(p.price.incomingprice * p.orderpieces).toLocaleString('ru-RU')}
        </span>
        <span className='ml-1'>USD</span>
      </li>
    </ul>
  );
};
