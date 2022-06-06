import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { t } from 'i18next';
import { Header } from './RegisterIncoming/Header';
import { TableHead } from './RegisterIncoming/TableHead';
import { Rows } from './RegisterIncoming/Rows';
import { ClearBtn, ClearBtnLoad } from '../../components/TableButtons';

export const RegisterIncoming = ({
  createHandler,
  removeIncoming,
  addIncoming,
  searchCategory,
  incomings,
  incoming,
  editIncoming,
  changeProduct,
  changeCategory,
  products,
  categorys,
  loading,
  suppliers,
  supplier,
  setSupplier,
  changeProductType,
  productType,
  brand,
  changeBrand,
  setModal,
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
        categorys={categorys}
        changeProductType={changeProductType}
        changeProduct={changeProduct}
        changeCategory={changeCategory}
        productType={productType}
        products={products}
        clearSelect={clearSelect}
      />
      <div className='rounded-t overflow-x-auto shadow-xl'>
        <div className='font-bold text-lg p-2  bg-white flex justify-between min-w-[991px]'>
          <span>
            {t(' Yetkazib beruvchi:')} {supplier && supplier.name}
          </span>
          <span className='text-sm flex items-center'>
            {loading ? <ClearBtnLoad /> : <ClearBtn clearDatas={clearSelect} />}
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
        <div className='text-right px-3 py-2 rounded  bg-white shadow-xl'>
          {loading ? (
            <button className='btn btn-primary' disabled>
              <span className='spinner-border spinner-border-sm'></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={createHandler}
              className='px-3 py-2 bg-blue-800 font-bold text-white rounded'>
              {t('Saqlash')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
