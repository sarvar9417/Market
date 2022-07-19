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
  const edit = (p) => {
    selectRef.unit.current.selectOption({
      label: p.unit.name,
      value: p.unit._id,
    });
    setProduct({
      ...p,
      productdata: p.productdata._id,
      code: p.productdata.code,
      name: p.productdata.name,
      priceid: p.price._id,
      incomingprice: p.price.incomingprice,
      sellingprice: p.price.sellingprice,
      incomingpriceuzs: p.price.incomingpriceuzs,
      sellingpriceuzs: p.price.sellingpriceuzs,
    });
  };

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
            edit={edit}
            setRemove={setRemove}
            setModal={setModal}
            loading={loading}
          />
        ))}
    </>
  );
};
