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
  editOrder,
  removeOrder,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{1 + index}</li>
      <li className='no'>{product.productdata.code}</li>
      <li className='col-span-3 td border-r'>{product.productdata.name}</li>
      <li className='td border-r text-right'>{product.orderpieces}</li>
      <li className='col-span-2 td border-r text-right'>
        {product.price.incomingprice} USD
      </li>
      <li className='col-span-2 td border-r text-right'>
        {product.price.incomingprice * product.orderpieces} USD
      </li>
      <li className='td-btn border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => editOrder(product, index)} />
        )}
      </li>
      <li className='td-btn'>
        {loading ? (
          <ClearBtn />
        ) : (
          <DeleteBtn deleteHandler={() => removeOrder(index)} />
        )}
      </li>
    </ul>
  );
};
