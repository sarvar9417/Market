import React from 'react';
import {
  ClearBtn,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const TableRow = ({
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
        <span className='w-1/2'>{p.code}</span>
      </li>
      <li className='col-span-5 td font-bold border-r'>{p.name}</li>
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
