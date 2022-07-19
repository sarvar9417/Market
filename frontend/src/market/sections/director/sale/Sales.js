import React from 'react';
import { TableHeader } from './Sales/TableHeader';
import { TableHead } from './Sales/TableHead';
import { Rows } from './Sales/Rows';

export const Sales = ({
  currency,
  keyPressed,
  changeSearch,
  getSaleConnectorsExcel,
  changePrepayment,
  changeDate,
  startDate,
  endDate,
  tableCard,
  Clear,
  editHandler,
  currentPage,
  addProducts,
  saleCounts,
  setCurrentPage,
  setPageSize,
  countPage,
  currentProducts,
  changeCheck,
  setCurrentProducts,
}) => {
  return (
    <div className='overflow-x-auto'>
      <div className={tableCard ? 'min-w-[992px]' : 'hidden'}>
        <TableHeader
          keyPressed={keyPressed}
          changeSearch={changeSearch}
          getSaleConnectorsExcel={getSaleConnectorsExcel}
          currentPage={currentPage}
          changeDate={changeDate}
          startDate={startDate}
          endDate={endDate}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          categoryCount={saleCounts}
          countPage={countPage}
          editHandler={editHandler}
        />
        <TableHead sales={currentProducts} setSales={setCurrentProducts} />
        {currentProducts.map((saleconnector, index) => {
          return (
            <Rows
              currency={currency}
              countPage={countPage}
              changePrepayment={changePrepayment}
              Clear={Clear}
              currentPage={currentPage}
              key={index}
              index={index}
              saleconnector={saleconnector}
              changeCheck={changeCheck}
              addProducts={addProducts}
              editHandler={editHandler}
            />
          );
        })}
      </div>
    </div>
  );
};
