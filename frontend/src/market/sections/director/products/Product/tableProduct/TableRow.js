import React from 'react';
import {
  ClearBtnLoad,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const TableRow = ({
  currency,
  countPage,
  p,
  index,
  edit,
  setModal,
  setRemove,
  loading,
  currentPage,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no text-right px-2'>
        <span className='w-1/2'>{p.productdata.code}</span>
      </li>
      <li className='col-span-5 td font-bold border-r'>{p.productdata.name}</li>
      <li className='col-span-1 td no flex justify-end px-1'>
        <span>{p.total.toLocaleString('ru-RU')}</span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price &&
          (currency === 'UZS'
            ? p.price.incomingpriceuzs &&
              p.price.incomingpriceuzs.toLocaleString('ru-RU')
            : p.price.incomingprice.toLocaleString('ru-RU'))}{' '}
        {currency}
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price &&
          (currency === 'UZS'
            ? p.price.sellingpriceuzs &&
              p.price.sellingpriceuzs.toLocaleString('ru-RU')
            : p.price.sellingprice.toLocaleString('ru-RU'))}{' '}
        {currency}
      </li>
      <li className='td-btn col-span-1 border-r'>
        {loading ? <SaveBtnLoad /> : <EditBtn editHandler={() => edit(p)} />}
      </li>
      <li className='td-btn col-span-1'>
        {loading ? (
          <ClearBtnLoad />
        ) : (
          <DeleteBtn
            deleteHandler={() => {
              setRemove(p);
              setModal(true);
            }}
          />
        )}
      </li>
    </ul>
  );
};
