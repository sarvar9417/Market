import React from 'react';
// import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../../components/PaginationSize';
import { Pagination } from '../../../components/Pagination';
import { ExcelDownload } from '../../../components/ExcelDownload';
import { t } from 'i18next';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TableHeader = ({
  searchKeypress,
  searchProductCode,
  getImportsExcel,
  countData,
  changeDate,
  startDate,
  endDate,
  setPageSize,
  searchSupplier,
  searchProduct,
  countPage,
  currentPage,
  setCurrentPage,
  loading,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'>
        <input
          onKeyUp={searchKeypress}
          onChange={searchSupplier}
          loading={loading}
          type='search'
          className='input'
          placeholder={t('Yetkazib beruvchi')}
        />
      </li>
      <li className='th-h border-r'>
        <input
          onKeyUp={searchKeypress}
          onChange={searchProductCode}
          loading={loading}
          type='search'
          className='input'
          placeholder={t('Kodi')}
        />
      </li>
      <li className='th-h border-r col-span-5 flex justify-between'>
        <input
          onKeyUp={searchKeypress}
          onChange={searchProduct}
          loading={loading}
          type='search'
          className='input w-[150px] h-8'
          placeholder={t('Mahsulot')}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={countData}
        />
      </li>
      <li className='th-h border-r col-span-4   '>
        <input
          onChange={changeDate}
          loading={loading}
          value={new Date(
            new Date(startDate).setHours(new Date(startDate).getHours() + 5)
          )
            .toISOString()
            .slice(0, 10)}
          type='date'
          name='startDate'
          className='border rounded p-1 focus:outline-green-800'
        />
        <input
          onChange={changeDate}
          loading={loading}
          value={new Date(
            new Date(endDate).setHours(new Date(endDate).getHours() + 5)
          )
            .toISOString()
            .slice(0, 10)}
          type='date'
          name='endDate'
          className='border rounded p-1 focus:outline-green-800 mx-2 '
        />

        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getImportsExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={t('Keltirilgan mahsulotlar')} />
      </li>
    </ul>
  );
};
