import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';
import { EditBtn } from '../../../../../sections/director/components/TableButtons';

export const Rows = ({ baseUrl, currentPage, index, market }) => {
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
            {t("Direktor yaratish")}
          </Link>
        )}
      </li>
      <li className='col-span-2 td border-r font-bold flex items-center justify-end'>
        +998 {market.phone1}
      </li>
      <li className='td border-r font-bold flex items-center justify-center'>
        {market.mainmarket ? (
          <span className='bg-orange-600 w-6 h-6 rounded-full shadow-orange-600 shadow-inner'></span>
        ) : (
          <span className='bg-green-600 w-6 h-6 rounded-full shadow-green-500 shadow-xl'></span>
        )}
      </li>
      <li className='td-btn border-r'>{<EditBtn />}</li>
      <li className='td-btn'>
        <Link
          to={`/alo24administration/control/${market._id}`}
          className='px-4 py-0 rounded-xl text-white bg-blue-700 hover:bg-blue-800'>
          <FontAwesomeIcon icon={faCheckDouble} />
        </Link>
      </li>
    </ul>
  );
};
