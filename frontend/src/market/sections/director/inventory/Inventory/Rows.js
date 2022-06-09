import React from 'react';
import { EditBtn } from '../../components/TableButtons';

export const Rows = ({ currentPage, index, product, countPage }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='td border-r font-bold text-right'>
        {product.category.code}
      </li>
      <li className='td border-r font-bold col-span-3 flex justify-between'>
        <span className='w-1/4'>{product.code}</span>
        <span className='w-3/4 text-right'>{product.name}</span>
      </li>
      <li className='td text-center col-span-2 border-r'>
        {product.brand && product.brand.name}
      </li>
      <li className='td col-span-2 border-r text-right'>
        <span>{Math.round(product.total * 100) / 100}</span>{' '}
        <span>{product.unit && product.unit.name}</span>
      </li>
      <li className='td  border-r text-right col-span-2'>
        <span>{Math.round(product.total * 100) / 100}</span>{' '}
        <span>{product.unit && product.unit.name}</span>
      </li>
      <li className='td-btn'>{<EditBtn />}</li>
    </ul>
  );
};
