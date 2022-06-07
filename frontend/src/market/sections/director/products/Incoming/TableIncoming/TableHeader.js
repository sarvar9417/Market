import React from 'react';
// import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../../components/PaginationSize';
import { Pagination } from '../../../components/Pagination';
import { ExcelDownload } from '../../../components/ExcelDownload';
import { t } from 'i18next';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TableHeader = ({
  getImportsExcel,
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
  currentPage,
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
          currentPage={currentPage}
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
          value={new Date(startDate).toISOString().slice(0, 10)}
          type='date'
          name='startDate'
          className='border rounded p-1 focus:outline-green-800'
        />
        <input
          onChange={changeDate}
          value={new Date(endDate).toISOString().slice(0, 10)}
          type='date'
          name='endDate'
          className='border rounded p-1 focus:outline-green-800 mx-2 '
        />

        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getImportsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={'Keltirilgan mahsulotlar'} />
      </li>
    </ul>
  );
};
