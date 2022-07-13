import React from 'react';
import { DeleteBtn } from '../../../components/TableButtons';

export const Rows = ({
  currentPage,
  index,
  expense,
  setModal,
  setDeletedData,
  isAbleDelete,
}) => {
  if (!isAbleDelete) {
    return (
      <ul className='tr font-bold'>
        <li className='no'>{currentPage * 10 + 1 + index}</li>
        <li className='col-span-1 td border-r font-bold text-right flex justify-center'>
          <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
        </li>
        <li className='td col-span-4 border-r text-right'>
          {expense.sum.toLocaleString('ru-RU')} <span className=''>USD</span>
        </li>
        <li className='td col-span-4 text-right border-r'>
          {expense.comment}{' '}
        </li>
        <li className='td  col-span-2 text-right border-r'>
          {(expense.type === 'cash' && 'Naqd') ||
            (expense.type === 'card' && 'Plastik') ||
            (expense.type === 'transfer' && "O'tkazma")}
        </li>
      </ul>
    );
  }
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-1 td border-r font-bold text-right flex justify-center'>
        <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
      </li>
      <li className='td col-span-3 border-r text-right'>
        {expense.sum.toLocaleString('ru-RU')} <span className=''>USD</span>
      </li>
      <li className='td col-span-4 text-right border-r'>{expense.comment} </li>
      <li className='td  col-span-2 text-right border-r'>
        {(expense.type === 'cash' && 'Naqt') ||
          (expense.type === 'card' && 'Plastik') ||
          (expense.type === 'transfer' && "O'tkazma")}
      </li>
      <li className='td  col-span-1 text-center border-r'>
        <DeleteBtn
          deleteHandler={() => {
            setModal(true);
            setDeletedData({
              _id: expense._id,
              market: expense.market,
            });
          }}
        />
      </li>
    </ul>
  );
};
