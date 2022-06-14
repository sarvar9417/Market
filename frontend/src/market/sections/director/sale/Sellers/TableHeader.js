import React from 'react';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { ExcelDownload } from '../../components/ExcelDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export const TableHeader = ({
  startDate,
  endDate,
  changeDate,
  getPaymentsExcel,
  currentPage,
  setPageSize,
  // searchPayment,
  setCurrentPage,
  paymentsCount,
  countPage,
  // keyPressed,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h col-span-9'>
        {/* <input
          className='w-[100px] border focus:outline-green-800 py-1 rounded px-2 mr-2'
          onChange={searchPayment}
          type={'text'}
          placeholder={'Mijoz nomi'}
          name='name'
          onKeyUp={keyPressed}
        /> */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={paymentsCount}
        />
        <input
          onChange={changeDate}
          defaultValue={new Date(startDate).toISOString().slice(0, 10)}
          type='date'
          name='startDate'
          className='border rounded p-1 focus:outline-green-800'
        />
        <input
          onChange={changeDate}
          defaultValue={new Date(endDate).toISOString().slice(0, 10)}
          type='date'
          name='endDate'
          className='border rounded p-1 focus:outline-green-800 ml-2'
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getPaymentsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={"To'lovlar"} />
      </li>
    </ul>
  );
};
