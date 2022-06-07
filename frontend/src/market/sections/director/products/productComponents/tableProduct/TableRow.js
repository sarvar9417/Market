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
      <li className='no flex justify-between px-2'>
        <div>{p.category.code}</div> <div>{p.code}</div>
      </li>
      <li className='col-span-3 td no flex justify-between px-4'>
        <div>{p.producttype && p.producttype.name}</div> <div>{p.name}</div>
      </li>
      <li className='col-span-2 td no px-2 flex justify-end'>
        {p.brand && p.brand.name}
      </li>
      <li className='col-span-1 td no flex justify-end px-2'>
        <div>{p.total}</div> <div>{p.unit.name}</div>
      </li>
      <li className='col-span-1 td no flex justify-end px-2'>
        {p.price && p.price.incomingprice}$
      </li>
      <li className='col-span-1 td no flex justify-end px-2'>
        {p.price && p.price.sellingprice}$
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
