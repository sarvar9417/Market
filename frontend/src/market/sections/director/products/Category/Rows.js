import React from 'react';
import { ClearBtnLoad, DeleteBtn, EditBtn, SaveBtnLoad } from '../../components/TableButtons';

export const Rows = ({
  loading,
  currentPage,
  index,
  c,
  category,
  setCategory,
  setRemove,
  setModal,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='no'>{c.code}</li>
      <li className='col-span-6 td border-r font-bold'>{c.name}</li>
      <li className='td-btn col-span-2 border-r'>
        { loading ? <SaveBtnLoad />: <EditBtn editHandler={() => setCategory({ ...category, ...c })} />}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? <ClearBtnLoad />:
          <DeleteBtn
            deleteHandler={() => {
              setRemove(c);
              setModal(true);
            }}
          />
        }
      </li>
    </ul>
  );
};
