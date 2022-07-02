import { t } from 'i18next';
import React from 'react';
import { SearchInput } from '../../../components/Input';
import { Pagination } from '../../../components/Pagination';

export const TableHeader = ({
  search,
  currentPage,
  setPageSize,
  changeHandler,
  keyPress,
  countPage,
  setCurrentPage,
  productsCount,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r col-span-1'>
        <select
          className='form-control form-control-sm selectpicker'
          placeholder={t("Bo'limni tanlang")}
          onChange={setPageSize}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </li>
      <li className='th-h border-r col-span-1'>
        <SearchInput
          changeHandler={changeHandler}
          type={'text'}
          placeholder={t('Kodi')}
          name='code'
          value={search.code}
          keyPressed={keyPress}
          className='text-right'
        />
      </li>
      <li className='th-h border-r col-span-10 flex justify-between'>
        <SearchInput
          changeHandler={changeHandler}
          type={'text'}
          placeholder={t('Mahsulot nomi')}
          name='name'
          value={search.name}
          keyPressed={keyPress}
          className={'w-[200px]'}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={productsCount}
        />
      </li>
    </ul>
  );
};
