import {
  faCheck,
  faFileExcel,
  faPenClip,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Rows = ({
  currentPage,
  index,
  connector,
  countPage,
  getInventories,
}) => {
  const history = useHistory();
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className=' td border-r font-bold col-span-2 text-right'>
        {new Date(connector.createdAt).toLocaleDateString()}
      </li>
      <li className=' td border-r font-bold text-right col-span-2'>
        {connector.id}
      </li>
      <li className=' td border-r font-bold text-right col-span-2'>
        {connector.inventories.length}
      </li>
      <li className='td-btn border-r'>
        {connector.completed ? (
          <FontAwesomeIcon
            icon={faCheck}
            className='bg-green-800 text-white p-1 rounded-full'
          />
        ) : (
          <FontAwesomeIcon
            onClick={() => {
              history.push('/alo24/inventory');
            }}
            icon={faPenClip}
            className='bg-orange-800 text-white p-1 rounded-full'
          />
        )}{' '}
      </li>
      <li className='td-btn col-span-2 border-r'>
        <button
          onClick={() => getInventories(connector._id)}
          className='px-4 bg-blue-800 rounded-2xl text-white hover:bg-blue-900'>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </li>
      <li className='td-btn col-span-2'>
        <button className='px-4 bg-green-800 rounded-2xl text-white hover:bg-green-900'>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
      </li>
    </ul>
  );
};
