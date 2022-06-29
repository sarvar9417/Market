import React from 'react';
import {
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
  ClearBtnLoad,
} from '../../components/TableButtons';

export const Rows = ({
  currentPage,
  index,
  c,
  setBrand,
  setRemove,
  setModal,
  loading,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-7 td border-r font-bold'>{c.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => setBrand({ ...c })} />
        )}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? (
          <ClearBtnLoad />
        ) : (
          <DeleteBtn
            deleteHandler={() => {
              setRemove(c);
              setModal(true);
            }}
          />
        )}
      </li>
    </ul>
  );
};
