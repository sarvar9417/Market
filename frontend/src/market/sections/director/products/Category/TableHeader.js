import React from 'react';
import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { ExcelDownload } from '../../components/ExcelDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';

export const TableHeader = ({
  getCategoryExcel,
  currentPage,
  setPageSize,
  searchCategory,
  setCurrentPage,
  totalDatas,
  countPage,
  search,
  loading,
  nameKeyPressed,
  codeKeyPressed,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'>
        <SearchInput
          loading={loading}
          changeHandler={searchCategory}
          type={'search'}
          placeholder={t('Kategoriya kodi')}
          name='code'
          value={search.code}
          keyPressed={codeKeyPressed}
        />
      </li>
      <li className='th-h col-span-4'>
        <SearchInput
          loading={loading}
          changeHandler={searchCategory}
          type={'search'}
          placeholder={t('Kategoriya nomi')}
          name='name'
          value={search.name}
          keyPressed={nameKeyPressed}
        />
      </li>
      <li className='th-h border-r col-span-4 '>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={totalDatas}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getCategoryExcel}
        >
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={t('Kategoriyalar')} />
      </li>
    </ul>
  );
};
