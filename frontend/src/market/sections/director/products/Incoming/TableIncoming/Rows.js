import React from 'react';
import {
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
  ClearBtnLoad,
} from '../../../components/TableButtons';

export const Rows = ({
  product,
  currentPage,
  index,
  countPage,
  changeEditProduct,
  changeDeleteProduct,
  loading,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no'>{product.supplier.name}</li>
      <li className='td border-r text-right font-bold'>
        <span>{product.product.productdata.code}</span>
      </li>
      <li className='td-btn col-span-3 border-r flex justify-between'>
        {product.product.productdata.name}
      </li>
      <li className='td border-orange-500  border-r-2 text-right'>
        <span className=''>{product.pieces.toLocaleString('ru-RU')}</span>{' '}
        <span className='text-orange-700'>{product.unit.name}</span>
      </li>
      <li className='td border-blue-800  border-r-2 text-right'>
        {product.unitprice.toLocaleString('ru-RU')}{' '}
        <span className='text-blue-900'>USD</span>
      </li>
      <li className='td border-green-700  border-r-2 text-right col-span-2 '>
        {product.totalprice.toLocaleString('ru-RU')}{' '}
        <span className='text-green-800'>USD</span>
      </li>
      <li className='td border-r text-right'>
        {!loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => changeEditProduct(product)} />
        )}
      </li>
      <li className='td border-r text-right'>
        {loading ? (
          <ClearBtnLoad />
        ) : (
          <DeleteBtn deleteHandler={() => changeDeleteProduct(product)} />
        )}
      </li>
    </ul>
  );
};
