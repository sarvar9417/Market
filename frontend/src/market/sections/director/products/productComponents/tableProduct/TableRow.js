import React from 'react';
import {
  ClearBtn,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const TableRow = ({
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
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='no flex justify-between'>
        <span className='w-1/2'>{p.category.code}</span>{' '}
        <span className='w-1/2'>{p.code}</span>
      </li>
      <li className='col-span-3 td no flex justify-between'>
        <span className='w-1/2 text-left'>
          {p.producttype && p.producttype.name}
        </span>{' '}
        <span className='w-1/2 text-right'>{p.name}</span>
      </li>
      <li className='col-span-2 td no px-1 flex justify-center px-1'>
        {p.brand && p.brand.name}
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        <span>{p.total}</span> <span className='ml-1'>{p.unit.name}</span>
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price && p.price.incomingprice} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price && p.price.sellingprice} USD
      </li>
      <li className='td-btn col-span-1 border-r'>
        {loading ? <SaveBtnLoad /> : <EditBtn editHandler={() => edit(p)} />}
      </li>
      <li className='td-btn col-span-1'>
        {loading ? (
          <ClearBtn />
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
