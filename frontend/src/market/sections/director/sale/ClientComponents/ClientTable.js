import { t } from 'i18next';
import React from 'react';
import { SearchInput } from '../../components/Input';
import { PaginationSize } from '../../components/PaginationSize';
import { Sort } from '../../components/Sort';
import { SortDoubleProperty } from '../../components/SortDoubleProperty';
import { Pagination } from '../../components/Pagination';
import { Rows } from './Rows';

export const ClientTable = ({
  setPageSize,
  searchClient,
  searchKeypress,
  currentPage,
  setCurrentPage,
  countPage,
  totalDatas,
  currentClients,
  setCurrentClients,
  setClient,
  setRemove,
  setModal,
  updateInputs,
}) => {
  return (
    <>
      <ul className='tbody border-b border-t-2 border-blue-800'>
        <li className='th-h border-r col-span-2'>
          <PaginationSize setPageSize={setPageSize} />
        </li>
        <li className='th-h col-span-3'>
          <SearchInput
            changeHandler={searchClient}
            type={'search'}
            placeholder={t('Yetkazuvchilar')}
            keyPressed={searchKeypress}
            name='packman'
          />
        </li>
        <li className='th-h col-span-3'>
          <SearchInput
            changeHandler={searchClient}
            type={'search'}
            placeholder={t('Mijozlar')}
            keyPressed={searchKeypress}
            name='client'
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
        <li className='th border-r col-span-3 flex justify-center'>
          {t('Yetkazuvchi')}{' '}
          <SortDoubleProperty
            innnerProperty={'name'}
            property={'packman'}
            data={currentClients}
            setData={setCurrentClients}
          />
        </li>
        <li className='th border-r col-span-3 flex justify-center'>
          {t('Nomi')}{' '}
          <Sort
            property={'name'}
            data={currentClients}
            setData={setCurrentClients}
          />
        </li>
        <li className='th col-span-2 border-r'>{t('Tahrirlash')}</li>
        <li className='th col-span-2'>{t("O'chirish")}</li>
      </ul>
      {currentClients &&
        currentClients.map((c, index) => {
          return (
            <Rows
              key={index}
              currentPage={currentPage}
              index={index}
              setClient={setClient}
              setRemove={setRemove}
              setModal={setModal}
              c={c}
              updateInputs={updateInputs}
            />
          );
        })}
    </>
  );
};
