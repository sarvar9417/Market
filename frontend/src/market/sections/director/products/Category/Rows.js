import React from 'react';
import { DeleteBtn, EditBtn } from '../../components/TableButtons';

export const Rows = ({
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
      <li className='col-span-6 td border-r'>{c.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {<EditBtn editHandler={() => setCategory({ ...category, ...c })} />}
      </li>
      <li className='td-btn col-span-2'>
        {
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
