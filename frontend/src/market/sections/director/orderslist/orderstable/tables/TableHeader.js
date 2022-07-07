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
  position,
  changeConnectorPosition,
}) => {
  const positionButton = () => {
    switch (position) {
      case 'sending':
        return { title: 'Qabul qilish', position: 'view' };
      case 'view':
        return { title: 'Tayyor', position: 'ready' };
      case 'ready':
        return { title: 'Yuborish', position: 'tosend' };
      case 'tosend':
        return { title: 'Yakunlash', position: 'accept' };
      default:
        return { title: 'Yakunlangan', position: 'end' };
    }
  };

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
      <li className='th-h border-r col-span-7 flex justify-between'>
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
      <li className='th-h border-r  items-center  col-span-3 '>
        {position === 'rejection' ? (
          <div className='bg-red-600 text-white rounded py-1'>
            Buyurtma rad etilgan
          </div>
        ) : position === 'accept' ? (
          <div className='bg-green-700 text-white rounded py-1'>
            Buyurtma yakunlangan
          </div>
        ) : (
          <div className='flex justify-between'>
            <button
              disabled={position === 'accept'}
              onClick={changeConnectorPosition}
              name={positionButton().position}
              className='bg-green-700 hover:bg-green-800 text-white px-4 rounded py-1 font-bold'>
              {positionButton().title}
            </button>
            <button
              disabled={position === 'accept'}
              onClick={changeConnectorPosition}
              name='rejection'
              className='bg-red-600 hover:bg-red-700 text-white px-4 rounded py-1 font-bold'>
              Rad etish
            </button>
          </div>
        )}
      </li>
    </ul>
  );
};
