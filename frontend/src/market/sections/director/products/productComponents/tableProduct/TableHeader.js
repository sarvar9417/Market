import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { ExcelDownloadBtn } from '../ExcelDownloadBtn';
import { ExcelUpload } from '../excelTable/ExcelUpload';
import { Pagination } from '../Pagination';

export const TableHeader = ({
  setPageSize,
  changeHandler,
  keyPress,
  countPage,
  setCurrentPage,
  productsCount,
  setImports,
  setModal2,
  loading,
  getProductExcel,
  excelRef,
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
        <input
          onChange={changeHandler}
          type='search'
          className='form-control form-control-sm selectpicker'
          placeholder={t('Kategoriya')}
          name='category'
          onKeyUp={keyPress}
        />
      </li>
      <li className='th-h border-r col-span-3'>
        <input
          onChange={changeHandler}
          type='search'
          className='w-100 form-control form-control-sm selectpicker'
          placeholder={t('Mahsulot turi')}
          name='producttype'
          onKeyUp={keyPress}
        />
      </li>
      <li className='th-h border-r col-span-2'>
        <input
          onChange={changeHandler}
          type='search'
          className='w-100 form-control form-control-sm selectpicker'
          placeholder={t('Brend')}
          name='brand'
          onKeyUp={keyPress}
        />
      </li>
      <li className='th-h border-r col-span-3 flex justify-center'>
        <Pagination
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={productsCount}
        />
      </li>
      <li className='th-h border-r col-span-1 flex justify-center'>
        <button
          className='px-4 bg-green-700 hover:bg-green-800 text-white rounded'
          onClick={getProductExcel}
        >
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <ExcelDownloadBtn excelRef={excelRef} filename={'Mahsulotlar'} />
      </li>
      <li className='th-h border-r col-span-1 flex justify-center'>
        <ExcelUpload
          setData={setImports}
          setModal={setModal2}
          loading={loading}
        />
      </li>
    </ul>
  );
};
