import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const TableRow = ({
  position,
  countPage,
  p,
  index,
  currentPage,
  changeInputs,
  saveHandler,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no text-right px-2'>
        <span className='w-1/2'>{p.productdata.code}</span>
      </li>
      <li className='col-span-4 td font-bold border-r'>{p.productdata.name}</li>
      <li className=' td no flex justify-end px-1'>
        <span>{p.product.total.toLocaleString('ru-RU')}</span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className=' td no flex justify-end px-1'>
        <span>{p.orderpieces.toLocaleString('ru-RU')}</span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className=' td no flex justify-end px-1'>
        <span>
          <input
            disabled={!(position === 'view' || position === 'ready')}
            name='sendingpieces'
            onChange={(e) => changeInputs(e, index)}
            type='number'
            className='w-full border outline-none px-2 text-right font-bold rounded'
            value={(p.sendingpieces && p.sendingpieces) || 0}
          />
        </span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='td no flex justify-end px-1'>
        <span>
          {(p.incomingpieces && p.incomingpieces.toLocaleString('ru-RU')) || 0}
        </span>{' '}
        <span className='ml-1'>{p.unit && p.unit.name}</span>
      </li>
      <li className='td no flex justify-end px-1'>
        <span>
          <input
            disabled={!(position === 'view' || position === 'ready')}
            name='incomingprice'
            onChange={(e) => changeInputs(e, index)}
            type='number'
            className='w-full border outline-none px-2 text-right font-bold rounded'
            value={
              (p.incomingprice && p.incomingprice) || p.price.incomingprice
            }
          />
        </span>
        <span className='ml-1'>USD</span>
      </li>
      <li className='td text-center'>
        <button
          id={index}
          onClick={() => saveHandler(p)}
          className='bg-green-700 hover:bg-green-800 text-white py-0 px-4 rounded-xl'>
          <FontAwesomeIcon icon={faSave} />
        </button>
      </li>
    </ul>
  );
};
