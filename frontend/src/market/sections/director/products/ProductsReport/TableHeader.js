import { faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { Pagination } from '../../components/Pagination';
import { SearchInput } from '../../components/Input';
import { ExcelDownload } from '../../components/ExcelDownload';

export const TableHeader = ({
  search,
  currentPage,
  setPageSize,
  changeHandler,
  keyPress,
  countPage,
  setCurrentPage,
  productsCount,
  getProductExcel,
  getProductsForPrint,
  setProductsChequesCount,
  productChequesCount,
  productCheque,
  loading,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r col-span-1'>
        <select
          className='form-control form-control-sm selectpicker'
          placeholder={t("Bo'limni tanlang")}
          onChange={setPageSize}
        >
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
          loading={loading}
          value={search.code}
          keyPressed={keyPress}
          className='text-right'
        />
      </li>
      <li className='th-h border-r col-span-6 flex justify-between'>
        <SearchInput
          changeHandler={changeHandler}
          type={'text'}
          placeholder={t('Mahsulot nomi')}
          name='name'
          loading={loading}
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
      <li className='th-h border-r col-span-2 flex justify-center'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getProductExcel}
        >
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownload filename={t('Mahsulotlar')} />
      </li>
      <li className='th-h border-r col-span-1 flex justify-center'>
        <input
          type='number'
          id='checkinput'
          className='max-w-[70%] outline-none text-ms border border-black px-2'
          onChange={(e) => {
            (isNaN(parseFloat(e.target.value)) && setProductsChequesCount(1)) ||
              setProductsChequesCount(parseFloat(e.target.value));
          }}
        />
      </li>
      <li className='th-h border-r col-span-1 flex justify-center'>
        <button
          onClick={() => getProductsForPrint()}
          className='px-4 bg-blue-700 text-white rounded hover:bg-blue-800'
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </li>
    </ul>
  );
};
