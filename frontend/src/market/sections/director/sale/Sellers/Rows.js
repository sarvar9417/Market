import React from 'react';
import { EditBtn } from './../../components/TableButtons';
export const Rows = ({ index, seller, setSeller }) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {seller.firstname}
      </li>
      <li className='td col-span-3 border-r text-left'>{seller.lastname}</li>
      <li className='td  col-span-2  text-right border-r'>
        +998 {seller.phone}
      </li>
      <li className='td  col-span-2  text-right border-r'>{seller.login}</li>
      <li className='td  col-span-2 text-center'>
        <EditBtn editHandler={() => setSeller(seller)} />
      </li>
    </ul>
  );
};
