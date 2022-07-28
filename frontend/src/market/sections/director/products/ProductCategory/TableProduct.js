import React from 'react';
import { TableRow } from './tableProduct/TableRow';
import { TableHeader } from './tableProduct/TableHeader';
import { TableHead } from './tableProduct/TableHead';

export const TableProduct = ({
  currency,
  search,
  changeHandler,
  setRemove,
  setModal,
  setProduct,
  setCurrentPage,
  countPage,
  currentProducts,
  setCurrentProducts,
  currentPage,
  setPageSize,
  loading,
  setImports,
  setModal2,
  selectRef,
  productsCount,
  keyPress,
  getProductExcel,
}) => {
  return (
    <>
      <TableHeader
        search={search}
        currentPage={currentPage}
        setPageSize={setPageSize}
        changeHandler={changeHandler}
        keyPress={keyPress}
        countPage={countPage}
        setCurrentPage={setCurrentPage}
        productsCount={productsCount}
        setImports={setImports}
        setModal2={setModal2}
        loading={loading}
        getProductExcel={getProductExcel}
      />

      <TableHead
        setCurrentProducts={setCurrentProducts}
        currentProducts={currentProducts}
      />

      {currentProducts &&
        currentProducts.map((p, index) => (
          <TableRow
            currency={currency}
            countPage={countPage}
            key={index}
            currentPage={currentPage}
            p={p}
            index={index}
            setRemove={setRemove}
            setModal={setModal}
            loading={loading}
          />
        ))}
    </>
  );
};
