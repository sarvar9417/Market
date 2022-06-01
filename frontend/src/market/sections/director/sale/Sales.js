import React from "react";
import { TableHeader } from "./Sales/TableHeader";
import { TableHead } from "./Sales/TableHead";
import { Rows } from "./Sales/Rows";

export const Sales = ({
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
}) => {
  return (
    <div className={tableCard ? "" : "hidden"}>
      <TableHeader
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        categoryCount={saleCounts}
        countPage={countPage}
        editHandler={editHandler}
      />
      <TableHead />
      {currentProducts.map((saleconnector, index) => {
        return (
          <Rows
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
  );
};
