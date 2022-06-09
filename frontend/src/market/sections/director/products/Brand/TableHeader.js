import React from 'react';
import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { ExcelDownload } from '../../components/ExcelDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export const TableHeader = ({
  getBrandsExcel,
  currentPage,
  setPageSize,
  searchBrand,
  setCurrentPage,
  brandsCount,
  countPage,
  keyPressed,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h col-span-5'>
        <SearchInput
          changeHandler={searchBrand}
          type={'text'}
          placeholder={'Brand nomi'}
          name='name'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-4 '>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={brandsCount}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getBrandsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={'Brandlar'} />
      </li>
    </ul>
  );
};