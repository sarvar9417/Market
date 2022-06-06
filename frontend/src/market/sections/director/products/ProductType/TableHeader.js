import React from 'react';
import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { ExcelDownload } from '../../components/ExcelDownload';

export const TableHeader = ({
  searchProductType,
  setPageSize,
  setCurrentPage,
  producttypeCount,
  countPage,
  search,
  keyPressed,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r col-span-2'>
        <SearchInput
          changeHandler={searchProductType}
          type={'text'}
          placeholder={'Kategoriya kodi'}
          name='code'
          value={search.categorycode}
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h col-span-3'>
        <SearchInput
          changeHandler={searchProductType}
          type={'text'}
          placeholder={'Mahsulot turi'}
          name='name'
          value={search.name}
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-4 '>
        <Pagination
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={producttypeCount}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        <ExcelDownload filename={'Kategoriya'} />
      </li>
    </ul>
  );
};
