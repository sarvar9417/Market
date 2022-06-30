import React from 'react';
import {
  ClearBtn,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const Rows = ({
  loading,
  index,
  product,
  editIncoming,
  removeIncoming,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{1 + index}</li>
      <li className='no'>{product.product.code}</li>
      <li className='col-span-3 td border-r'>{product.product.name}</li>
      <li className='td border-r text-right'>{product.pieces}</li>
      <li className='col-span-2 td border-r text-right'>
        {product.unitprice} USD
      </li>
      <li className='col-span-2 td border-r text-right'>
        {product.totalprice} USD
      </li>
      <li className='td-btn border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => editIncoming(product, index)} />
        )}
      </li>
      <li className='td-btn'>
        {loading ? (
          <ClearBtn />
        ) : (
          <DeleteBtn deleteHandler={() => removeIncoming(index)} />
        )}
      </li>
    </ul>
  );
};
