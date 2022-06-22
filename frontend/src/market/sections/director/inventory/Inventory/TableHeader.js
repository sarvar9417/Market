import React from 'react';
// import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Pagination } from '../../components/Pagination';
import { SearchInput } from '../../components/Input';
import { t } from 'i18next';

export const TableHeader = ({
  setModal,
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
      <li className='th-h border-r col-span-2'>
        <SearchInput
          changeHandler={changeHandler}
          type={'number'}
          placeholder={t('Kodi')}
          name='productcode'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-4 flex'>
        <SearchInput
          changeHandler={changeHandler}
          type={'text'}
          placeholder={t('Nomi')}
          name='productname'
          keyPressed={keyPressed}
        />
      </li>
      <li className='th-h border-r col-span-5 flex justify-between'>
        <button
          onClick={() => setModal(true)}
          className='bg-orange-700 text-white px-3 rounded font-bold hover:bg-orange-600'>
          {t('Yakunlash')}
        </button>
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
