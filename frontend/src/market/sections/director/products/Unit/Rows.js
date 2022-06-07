import React from 'react';
import { DeleteBtn, EditBtn } from '../../components/TableButtons';

export const Rows = ({ index, unit, setUnit, setRemove, setModal }) => {
  return (
    <ul className='tr'>
      <li className='no'>{1 + index}</li>
      <li className='col-span-7 td border-r font-bold'>{unit.name}</li>
      <li className='td-btn col-span-2 border-r'>
        {<EditBtn editHandler={() => setUnit({ ...unit })} />}
      </li>
      <li className='td-btn col-span-2'>
        {
          <DeleteBtn
            deleteHandler={() => {
              setRemove(unit);
              setModal(true);
            }}
          />
        }
      </li>
    </ul>
  );
};
