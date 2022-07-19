import React from 'react';
import {
  ClearBtn,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const Rows = ({
  currency,
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
      <li className='td border-r text-right'>
        {product.pieces.toLocaleString('ru-RU')}
      </li>
      <li className='col-span-2 td border-r text-right'>
        {currency === 'UZS'
          ? product.unitpriceuzs.toLocaleString('ru-RU')
          : product.unitprice.toLocaleString('ru-RU')}{' '}
        {currency}
      </li>
      <li className='col-span-2 td border-r text-right'>
        {currency === 'UZS'
          ? product.totalpriceuzs.toLocaleString('ru-RU')
          : product.totalprice.toLocaleString('ru-RU')}{' '}
        {currency}
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
