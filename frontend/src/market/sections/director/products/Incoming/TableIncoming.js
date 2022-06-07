import React from 'react';
import { TableHeader } from './TableIncoming/TableHeader';
import { TableHead } from './TableIncoming/TableHead';
import { Rows } from './TableIncoming/Rows';

export const TableIncoming = ({
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
  searchCategoryTable,
  searchSupplier,
  searchProduct,
  searchBrand,
}) => {
  return (
    <div className=''>
      <TableHeader
        getImportsExcel={getImportsExcel}
        currentPage={currentPage}
        setPageSize={setPageSize}
        countData={countData}
        changeDate={changeDate}
        startDate={startDate}
        endDate={endDate}
        searchBrand={searchBrand}
        searchCategoryTable={searchCategoryTable}
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
