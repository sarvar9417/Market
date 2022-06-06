import React from 'react';
// import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../../components/PaginationSize';
import { Pagination } from '../../../components/Pagination';
import { ExcelDownload } from '../../../components/ExcelDownload';
import { t } from 'i18next';

export const TableHeader = ({
  countData,
  changeDate,
  startDate,
  endDate,
  setPageSize,
  searchSupplier,
  searchCategoryTable,
  searchProduct,
  searchBrand,
  countPage,
  setCurrentPage,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'>
        <input
          onChange={searchSupplier}
          type='search'
          className='input'
          placeholder={t('Yetkazib beruvchi')}
        />
      </li>
      <li className='th-h border-r'>
        <input
          onChange={searchCategoryTable}
          style={{ maxWidth: '100px' }}
          type='search'
          className='input'
          placeholder={t('Kategoriya')}
          aria-controls='basicExample'
        />
      </li>
      <li className='th-h border-r col-span-4'>
        <input
          onChange={searchProduct}
          style={{ maxWidth: '100px' }}
          type='search'
          className='input'
          placeholder={t('Mahsulot')}
          aria-controls='basicExample'
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={countData}
        />
      </li>
      <li className='th-h border-r'>
        <input
          onChange={searchBrand}
          style={{ maxWidth: '100px' }}
          type='search'
          className='input'
          placeholder={t('Brend')}
          aria-controls='basicExample'
        />
      </li>
      <li className='th-h border-r col-span-4   '>
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
          className='border rounded p-1 focus:outline-green-800 mx-2 '
        />

        <ExcelDownload filename={'Keltirilgan mahsulotlar'} />
      </li>
    </ul>
  );
};
