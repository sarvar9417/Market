import React from 'react';

export const Rows = ({ product, currentPage, index }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='no'>{product.supplier.name}</li>
      <li className='td border-r flex justify-between font-bold'>
        <span className='text-blue-900'>{product.category.code}</span>
        <span>{product.product.code}</span>
      </li>
      <li className='td-btn col-span-4 border-r flex justify-between'>
        <span className='w-1/2'>
          {product.producttype && product.producttype.name}
        </span>
        <span className='w-1/2 text-right'>{product.product.name}</span>
      </li>
      <li className='td border-r'>{product.brand && product.brand.name} </li>
      <li className='td border-r text-right'>
        <span className=''>{product.pieces}</span>{' '}
        <span className='text-orange-700'>{product.unit.name}</span>
      </li>
      <li className='td border-r text-right'>
        {product.unitprice} <span className='text-green-800'>USD</span>
      </li>
      <li className='td border-r text-right col-span-2'>
        {product.totalprice} <span className='text-green-800'>USD</span>
      </li>
    </ul>
  );
};
