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
  p,
  setPackman,
  setRemove,
  setModal,
  loading,
}) => {
  return (
    <ul className='tr'>
      <li className='no col-span-2'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-6 td border-r'>{p.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => setPackman({ ...p })} />
        )}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? (
          <ClearBtnLoad />
        ) : (
          <DeleteBtn
            deleteHandler={() => {
              setRemove({ ...p });
              setModal(true);
            }}
          />
        )}
      </li>
    </ul>
  );
};
