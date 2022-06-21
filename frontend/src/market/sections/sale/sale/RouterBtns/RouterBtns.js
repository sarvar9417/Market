import { faAdd, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { t } from 'i18next'

export const RouterBtns = ({
  changeSellingCard,
  // changeSellingEditCard,
  changeTableCard,
}) => {
  return (
    <div className='flex justify-end m-3'>
      <button
        onClick={changeSellingCard}
        className='bg-darkblue-400 hover:bg-darkblue-500 px-2 py-1 text-white font-bold rounded-2xl flex'>
        <span className='w-[20px] h-[20px] bg-white text-darkblue-500 flex items-center justify-center mr-1 rounded-full'>
          <FontAwesomeIcon icon={faAdd} />
        </span>{' '}
        {t("Sotuv")}
      </button>
      {/* <button
        onClick={changeSellingEditCard}
        className='bg-red-600 hover:bg-red-700 px-2 py-1 text-white font-bold rounded-2xl flex ml-2'>
        <span className='w-[20px] h-[20px] bg-white text-red-600 flex items-center justify-center mr-1 rounded-full'>
          <FontAwesomeIcon icon={faEdit} />
        </span>{" "}
        Tahrirlash
      </button> */}
      <button
        onClick={changeTableCard}
        className='bg-green-700 hover:bg-green-800 px-2 py-1 text-white font-bold rounded-2xl flex ml-2'>
        <span className='w-[20px] h-[20px] bg-white text-green-700 flex items-center justify-center mr-1 rounded-full'>
          <FontAwesomeIcon icon={faTable} />
        </span>{' '}
        {t("Ro'yxat")}
      </button>
    </div>
  );
};
