import React from 'react';
import { ExcelTable } from './components/ExcelTable';
import { TableHeader } from './TableIncoming/TableHeader';
import { TableHead } from './TableIncoming/TableHead';
import { Rows } from './TableIncoming/Rows';

export const TableIncoming = ({
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
      <ExcelTable data={currentImports} />
    </div>
  );
};
