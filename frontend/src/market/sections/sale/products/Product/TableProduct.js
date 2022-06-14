import React from 'react';
import { TableRow } from './tableProduct/TableRow';
import { TableHeader } from './tableProduct/TableHeader';
import { TableHead } from './tableProduct/TableHead';

export const TableProduct = ({
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
}) => {
  const edit = (p) => {
    // selectRef.category.current.selectOption({
    //   label: p.category.code,
    //   value: p.category._id,
    // });
    // selectRef.producttype.current.selectOption({
    //   label: p.producttype && p.producttype.name,
    //   value: p.producttype && p.producttype._id,
    // });
    // selectRef.brand.current.selectOption({
    //   label: p.brand ? p.brand.name : '',
    //   value: p.brand ? p.brand._id : '',
    // });
    selectRef.unit.current.selectOption({
      label: p.unit.name,
      value: p.unit._id,
    });
    setProduct({
      ...p,
      priceid: p.price._id,
      incomingprice: p.price.incomingprice,
      sellingprice: p.price.sellingprice,
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
      />

      <TableHead
        setCurrentProducts={setCurrentProducts}
        currentProducts={currentProducts}
      />

      {currentProducts &&
        currentProducts.map((p, index) => (
          <TableRow
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
