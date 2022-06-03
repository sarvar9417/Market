import React from "react";
import {
  ClearBtn,
  DeleteBtn,
  EditBtn,
  SaveBtnLoad,
} from "../../components/TableButtons";

export const Rows = ({
  currentPage,
  loading,
  index,
  c,
  brand,
  setBrand,
  setRemove,
  setModal,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-7 td border-r font-bold'>{c.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <EditBtn editHandler={() => setBrand({ ...brand, ...c })} />
        )}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? (
          <ClearBtn />
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
