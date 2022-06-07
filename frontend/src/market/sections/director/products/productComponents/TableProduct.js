import React from 'react';
import { TableRow } from './tableProduct/TableRow';
import { TableHeader } from './tableProduct/TableHeader';
import { TableHead } from './tableProduct/TableHead';

export const TableProduct = ({
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
  tableExcel,
  setImports,
  setModal2,
  selectRef,
  market,
  productsCount,
  keyPress,
  getProductExcel,
}) => {
  const edit = (p) => {
    selectRef.category.current.selectOption({
      label: p.category.code,
      value: p.category._id,
    });
    selectRef.producttype.current.selectOption({
      label: p.producttype.name,
      value: p.producttype._id,
    });
    selectRef.brand.current.selectOption({
      label: p.brand.name,
      value: p.brand._id,
    });
    selectRef.unit.current.selectOption({
      label: p.unit.name,
      value: p.unit._id,
    });
    setProduct({
      market: market && market._id,
      _id: p._id,
      name: p.name,
      code: p.code,
      category: p.category._id,
      unit: p.unit._id,
      producttype: p.producttype._id,
      brand: p.brand ? p.brand._id : '',
      total: p.total || 0,
      priceid: (p.price && p.price._id) || 0,
      incomingprice: p.price.incomingprice || 0,
      sellingprice: p.price.sellingprice || 0,
    });
  };

  return (
    <>
      <TableHeader
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
