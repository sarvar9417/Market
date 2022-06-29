import {
  faCheck,
  faFileExcel,
  faPenClip,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ExcelDownload } from '../../components/ExcelDownload';
import { PrintBtnLoad } from '../../components/TableButtons';
import { SaveBtnLoad } from '../../components/TableButtons';

export const Rows = ({
  currentPage,
  index,
  connector,
  countPage,
  changePrint,
  getInventoriesExcel,
  loading,
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
        {loading ? <PrintBtnLoad/>: <button
          onClick={() => changePrint(connector._id)}
          className='px-4 bg-blue-800 rounded-2xl text-white hover:bg-blue-900'>
          <FontAwesomeIcon icon={faPrint} />
        </button>}
      </li>
      <li className='td-btn col-span-2'>
        {loading ? <SaveBtnLoad/>: <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={() => getInventoriesExcel(connector._id)}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>}
        <ExcelDownload filename={t('Inventarizatsiya')} />
      </li>
    </ul>
  );
};
