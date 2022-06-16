import React from 'react';
import { EditBtn } from '../../../components/TableButtons';

export const Rows = ({
  product,
  currentPage,
  index,
  countPage,
  changeEditProduct,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no'>{product.supplier.name}</li>
      <li className='td border-r text-right font-bold'>
        <span>{product.product.code}</span>
      </li>
      <li className='td-btn col-span-3 border-r flex justify-between'>
        {product.product.name}
      </li>
      <li className='td border-r text-right col-span-2'>
        <span className=''>{product.pieces}</span>{' '}
        <span className='text-orange-700'>{product.unit.name}</span>
      </li>
      <li className='td border-r text-right'>{product.unitprice}</li>
      <li className='td border-r text-right col-span-2'>
        {product.totalprice} <span className='text-green-800'>USD</span>
      </li>
      <li className='td border-r text-right'>
        <EditBtn editHandler={() => changeEditProduct(product)} />
      </li>
    </ul>
  );
};
