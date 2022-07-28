import React from 'react';
import {
  ClearBtn,
  ClearBtnLoad,
  SaveBtn,
  SaveBtnLoad,
} from '../../../components/TableButtons';

export const CreateBtn = ({ clearInputs, saveHandler, loading }) => {
  return (
    <ul className='tbody bg-white flex justify-end mb-4'>
      <li className='td-btn py-2  col-span-1'>
        {loading ? <SaveBtnLoad /> : <SaveBtn saveHandler={saveHandler} />}
      </li>
      <li className='td-btn py-2 col-span-1'>
        {loading ? <ClearBtnLoad /> : <ClearBtn clearDatas={clearInputs} />}
      </li>
    </ul>
  );
};
