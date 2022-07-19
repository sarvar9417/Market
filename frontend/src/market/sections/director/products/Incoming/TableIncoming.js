import React from 'react';
import { TableHeader } from './TableIncoming/TableHeader';
import { TableHead } from './TableIncoming/TableHead';
import { Rows } from './TableIncoming/Rows';

export const TableIncoming = ({
  currency,
  changeDeleteProduct,
  changeEditProduct,
  searchKeypress,
  searchProductCode,
  getImportsExcel,
  countData,
  changeDate,
  startDate,
  endDate,
  currentImports,
  setCurrentImports,
  countPage,
  currentPage,
  setCurrentPage,
  setPageSize,
  searchSupplier,
  searchProduct,
}) => {
  return (
    <div className=''>
      <TableHeader
        searchKeypress={searchKeypress}
        searchProductCode={searchProductCode}
        getImportsExcel={getImportsExcel}
        currentPage={currentPage}
        setPageSize={setPageSize}
        countData={countData}
        changeDate={changeDate}
        startDate={startDate}
        endDate={endDate}
        searchProduct={searchProduct}
        searchSupplier={searchSupplier}
        setCurrentPage={setCurrentPage}
        countPage={countPage}
      />
      <TableHead
        currentImport={currentImports}
        setCurrentInports={setCurrentImports}
      />
      {currentImports.map((product, index) => {
        return (
          <Rows
            currency={currency}
            changeDeleteProduct={changeDeleteProduct}
            changeEditProduct={changeEditProduct}
            countPage={countPage}
            index={index}
            key={index}
            product={product}
            currentPage={currentPage}
          />
        );
      })}
    </div>
  );
};
