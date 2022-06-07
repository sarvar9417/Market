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
      <li className='no'>
        {p.category.code} {'-'} {p.code}
      </li>
      <li className='col-span-3 td no'>
        {p.producttype && p.producttype.name} {'-'} {p.name}
      </li>
      <li className='col-span-2 td no'>{p.brand && p.brand.name}</li>
      <li className='col-span-1 td no'>
        {p.total} {p.unit.name}
      </li>
      <li className='col-span-1 td no'>{p.price && p.price.incomingprice}$</li>
      <li className='col-span-1 td no'>{p.price && p.price.sellingprice}$</li>
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
