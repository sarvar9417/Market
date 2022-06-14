import React from 'react';
// import { SearchInput } from "../../components/Input";
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { ExcelDownload } from '../../components/ExcelDownload';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInput } from '../../components/Input';
import { t } from 'i18next';

export const TableHeader = ({
  keyPressed,
  changeSearch,
  getSaleConnectorsExcel,
  currentPage,
  changeDate,
  startDate,
  endDate,
  setPageSize,
  setCurrentPage,
  categoryCount,
  countPage,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'>
        <SearchInput
          changeHandler={changeSearch}
          name='id'
          placeholder={'ID'}
          type='number'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r'>
        <SearchInput
          changeHandler={changeSearch}
          name='client'
          placeholder={t('Mijoz')}
          keyPressed={keyPressed}
        />
      </li>
      {/* <li className='th-h border-r'>
        <SearchInput
          // changeHandler={searchCategory}
          type={"search"}
          placeholder={"Mahsulotlar"}
          name='searchCategory'
        />{" "}
      </li> */}
      <li className='th-h col-span-8'>
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
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={categoryCount}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold py-2 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getSaleConnectorsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={t('Sotuvlar')} />
      </li>
    </ul>
  );
};
