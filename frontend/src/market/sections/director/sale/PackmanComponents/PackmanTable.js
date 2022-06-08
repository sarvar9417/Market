import { t } from 'i18next';
import React from 'react';
import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Sort } from '../../components/Sort';
import { Pagination } from '../components/Pagination';
import { Rows } from './Rows';

export const PackmanTable = ({
  setPageSize,
  currentPage,
  setCurrentPage,
  countPage,
  totalDatas,
  currentPackmans,
  setCurrentPackmans,
  setModal,
  setPackman,
  setRemove,
  searchPackman,
  searchKeypress,
}) => {
  return (
    <>
      <ul className='tbody border-b border-t-2 border-blue-800'>
        <li className='th-h border-r col-span-2'>
          <PaginationSize setPageSize={setPageSize} />
        </li>
        <li className='th-h col-span-6 border-r'>
          <SearchInput
            changeHandler={searchPackman}
            type={'search'}
            placeholder={t('Yetkazuvchilar')}
            keyPressed={searchKeypress}
          />
        </li>
        <li className='th-h border-r col-span-4 flex justify-center '>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countPage={countPage}
            totalDatas={totalDatas}
          />
        </li>
      </ul>
      <ul className='thead shadow-xl'>
        <li className='th border-r col-span-2'>№</li>
        <li className='th border-r col-span-6 flex justify-center'>
          {t('Nomi')}{' '}
          <Sort
            property={'name'}
            data={currentPackmans}
            setData={setCurrentPackmans}
          />
        </li>
        <li className='th col-span-2 border-r'>{t('Tahrirlash')}</li>
        <li className='th col-span-2'>{t("O'chirish")}</li>
      </ul>
      {currentPackmans &&
        currentPackmans.map((p, index) => {
          return (
            <Rows
              p={p}
              index={index}
              key={index}
              setModal={setModal}
              setPackman={setPackman}
              setRemove={setRemove}
              currentPage={currentPage}
            />
          );
        })}
    </>
  );
};
