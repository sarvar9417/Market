import React from 'react';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';

export const TableHeader = ({
  startDate,
  endDate,
  changeDate,
  currentPage,
  setPageSize,
  setCurrentPage,
  connectorsCount,
  countPage,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h col-span-5'>
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
      <li className='th-h border-r col-span-4 '>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={connectorsCount}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        {/* <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getInventorsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={'Inventorlar'} /> */}
      </li>
    </ul>
  );
};
