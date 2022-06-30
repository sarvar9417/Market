import { faClose, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Control = ({ print, setCheck }) => {
  return (
    <div className='w-full flex '>
      <button
        onClick={print}
        className='bg-blue-700 hover:bg-blue-800 text-white m-auto px-10 py-1 text-lg  rounded mr-4'>
        <FontAwesomeIcon icon={faPrint} />
      </button>
      <button
        onClick={() => setCheck(false)}
        className='bg-red-500 hover:bg-red-600 text-white m-auto px-10 py-1 text-lg  rounded ml-4'>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};
