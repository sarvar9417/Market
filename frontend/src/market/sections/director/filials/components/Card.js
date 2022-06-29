import { faCashRegister, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Card = ({ filial }) => {
  console.log(filial);
  return (
    <div className='bg-blue-800 rounded px-3 py-2  text-white opacity-90 shadow-2xl'>
      <div className='flex justify-center font-bold mb-2 text-lg '>
        {filial.market.name}
      </div>
      <div className='flex justify-between font-bold mb-2 text-base'>
        <span>Direktor:</span>
        <span>
          {filial.market.director &&
            filial.market.director.firstname +
              ' ' +
              filial.market.director.lastname}
        </span>
      </div>
      <div className='flex justify-between font-bold mb-2 text-base'>
        <span>Mahsulotlar turi:</span>
        <span>{filial.count.toLocaleString('ru-RU')}</span>
      </div>
      <div className='flex justify-between font-bold mb-2 text-base'>
        <span>Mahsulotlar soni:</span>
        <span>{filial.pieces.toLocaleString('ru-RU')}</span>
      </div>
      <div className='flex justify-between font-bold mb-2 text-base'>
        <span>Jami summasi:</span>
        <span>{filial.totalprice.toLocaleString('ru-RU')} USD</span>
      </div>
      <div className='flex justify-end font-bold mb-2 text-base'>
        <button className='px-4 py-1 bg-red-700 rounded  hover:bg-red-600 ml-2'>
          <FontAwesomeIcon icon={faCashRegister} />
        </button>
        <button className='px-4 py-1 bg-green-600 rounded  hover:bg-green-500 ml-2'>
          <FontAwesomeIcon icon={faTable} />
        </button>
      </div>
    </div>
  );
};
