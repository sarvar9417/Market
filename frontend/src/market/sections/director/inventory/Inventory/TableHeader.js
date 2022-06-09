import React from 'react';
// import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { SearchInput } from '../../components/Input';

export const TableHeader = ({
  currentPage,
  setPageSize,
  changeHandler,
  setCurrentPage,
  productsCount,
  countPage,
  keyPressed,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'>
        <SearchInput
          changeHandler={changeHandler}
          type={'number'}
          placeholder={'Kategoriya'}
          name='categorycode'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-3 flex'>
        <span className='w-1/4 mr-1'>
          <SearchInput
            changeHandler={changeHandler}
            type={'number'}
            placeholder={'Kodi'}
            name='productcode'
            keyPressed={keyPressed}
          />
        </span>
        <span>
          <SearchInput
            changeHandler={changeHandler}
            type={'text'}
            placeholder={'Nomi'}
            name='productname'
            keyPressed={keyPressed}
          />
        </span>
      </li>
      <li className='th-h border-r col-span-2 flex'>
        <SearchInput
          changeHandler={changeHandler}
          type={'text'}
          placeholder={'Brand'}
          name='brand'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-5 '>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={productsCount}
        />
      </li>
      {/* <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getInventorsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={'Inventorlar'} />
      </li> */}
    </ul>
  );
};
