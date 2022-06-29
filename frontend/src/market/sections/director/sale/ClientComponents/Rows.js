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
  setClient,
  setRemove,
  setModal,
  c,
  updateInputs,
  loading,
}) => {
  return (
    <ul className='tr'>
      <li className='no col-span-2'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-3 td border-r'>{c.packman && c.packman.name}</li>
      <li className='col-span-3 td border-r'>{c.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => updateInputs(c)} />
        )}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? (
          <ClearBtnLoad />
        ) : (
          <DeleteBtn
            deleteHandler={() => {
              setRemove({ ...c });
              setModal(true);
            }}
          />
        )}
      </li>
    </ul>
  );
};
