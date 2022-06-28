import React from 'react';
// import { ExcelDownload } from '../../components/ExcelDownload';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { Pagination } from '../../../../../sections/director/components/Pagination';
import { PaginationSize } from '../../../../../sections/director/components/PaginationSize';
import { SearchInput } from '../../../../../sections/director/components/Input';
import { Link } from 'react-router-dom';

export const TableHeader = ({
  searchKeypress,
  currentPage,
  setPageSize,
  setCurrentPage,
  totalDatas,
  countPage,
  search,
  searchMarket,
  searchDirector,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'></li>
      <li className='th-h border-r col-span-2'>
        <SearchInput
          type={'search'}
          placeholder={t("Do'kon nomi")}
          name='name'
          changeHandler={searchMarket}
          value={search.name}
          keyPressed={searchKeypress}
        />
      </li>
      <li className='th-h col-span-3'>
        <SearchInput
          type={'search'}
          placeholder={t('Direktor')}
          name='director'
          changeHandler={searchDirector}
          value={search.director}
          keyPressed={searchKeypress}
        />
      </li>
      <li className='th-h border-r col-span-4 '>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={totalDatas}
          keyPressed={searchKeypress}
        />
      </li>
      <li className='th-h'>
        <Link
          to='/alo24administration/register'
          className='px-4 py-1 inline-block text-base font-bold bg-green-700 hover:bg-green-800 rounded text-white'>
          +
        </Link>
      </li>
      {/* <li className='text-center flex justify-center items-center font-bold border-r py-2 col-span-1 bg-white'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getCategoryExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={t('Kategoriyalar')} />
      </li> */}
    </ul>
  );
};
