import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { t } from 'i18next';
import { Header } from './RegisterIncoming/Header';
import { TableHead } from './RegisterIncoming/TableHead';
import { Rows } from './RegisterIncoming/Rows';
import { ClearBtn, ClearBtnLoad } from '../../components/TableButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faSave } from '@fortawesome/free-solid-svg-icons';

export const RegisterIncoming = ({
  saveTemporary,
  changeSaveIncoming,
  removeIncoming,
  incomings,
  editIncoming,
  changeProduct,
  products,
  loading,
  suppliers,
  supplier,
  setSupplier,
  selectRef,
  clearSelect,
}) => {
  return (
    <div>
      <Header
        loading={loading}
        setSupplier={setSupplier}
        suppliers={suppliers}
        selectRef={selectRef}
        changeProduct={changeProduct}
        products={products}
        clearSelect={clearSelect}
      />
      <div className='rounded-t overflow-x-auto shadow-xl'>
        <div className='min-w-[991px]'>
          <div className='font-bold text-lg p-2  bg-white flex justify-between'>
            <span>
              {t('Yetkazib beruvchi')} {supplier && supplier.name}
            </span>
            <span className='text-sm flex items-center'>
              {loading ? (
                <ClearBtnLoad />
              ) : (
                <ClearBtn clearDatas={clearSelect} />
              )}
            </span>
          </div>
          <TableHead />
          {incomings &&
            incomings.map((product, key) => {
              return (
                <Rows
                  product={product}
                  key={key}
                  index={key}
                  editIncoming={editIncoming}
                  removeIncoming={removeIncoming}
                />
              );
            })}
        </div>
        <div className='text-right px-3 py-2 rounded  bg-white shadow-xl'>
          {loading ? (
            <button
              className='px-3 py-2 bg-orange-800 font-bold text-white rounded mr-3'
              disabled
            >
              <span className='spinner-border spinner-border-sm'></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={saveTemporary}
              className='px-3 py-1 bg-orange-800 font-bold text-white rounded mr-3 text-2xl'
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          )}
          {loading ? (
            <button
              className='px-3 py-2 bg-blue-800 font-bold text-white rounded'
              disabled
            >
              <span className='spinner-border spinner-border-sm'></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={changeSaveIncoming}
              className='px-3 py-1 bg-blue-800 font-bold text-white rounded text-2xl'
            >
              <FontAwesomeIcon icon={faMoneyCheckDollar} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
