import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const Rows = ({
  baseUrl,
  currentPage,
  index,
  market,
  changeFilial,
  changeSave,
}) => {
  return (
    <ul className='tr'>
      <li className='no items-center flex justify-center'>
        {currentPage * 10 + 1 + index}
      </li>
      <li className='no text-center'>
        <img
          className='w-[40px] h-[40px] rounded-full inline-block'
          src={baseUrl && `${baseUrl}/api/upload/file/${market.image}`}
          alt='Logo'
        />
      </li>
      <li className='col-span-2 td border-r font-bold flex items-center'>
        {market.name}
      </li>
      <li className='col-span-3 td border-r font-bold flex items-center justify-center'>
        {market.director ? (
          market.director.firstname + ' ' + market.director.lastname
        ) : (
          <Link
            to={`/alo24administration/registerdirector/${market._id}`}
            className='px-4 py-1 bg-green-800 hover:bg-green-900 text-white font-bold rounded'>
            Direktor yaratish
          </Link>
        )}
      </li>
      <li className='col-span-2 td border-r font-bold flex items-center justify-end'>
        +998 {market.phone1}
      </li>
      <li className='td border-r font-bold flex items-center justify-center'>
        <input
          // checked={!!market.mainmarket}
          type='checkbox'
          className='border-blue-800 border w-[15px] h-[15px]'
        />
      </li>
      <li className='td border-r font-bold flex items-center justify-center'>
        <input
          type='checkbox'
          checked={!!market.mainmarket}
          onChange={(e) => changeFilial(e, market, index)}
          className='border-blue-800 border w-[15px] h-[15px]'
        />
      </li>
      <li className='td-btn'>
        <button
          onClick={() => changeSave(market)}
          className='px-4 py-0 rounded-xl text-white bg-green-700 hover:bg-green-800'>
          <FontAwesomeIcon icon={faSave} />
        </button>
      </li>
    </ul>
  );
};
