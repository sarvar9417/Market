import React from 'react';
import { Rows } from './tableExpense/Rows';
import { TableHead } from './tableExpense/TableHead';
import { TableHeader } from './tableExpense/TableHeader';

export const TableExpense = ({
  setPageSize,
  countPage,
  setCurrentPage,
  dataCount,
  getExpenseExcel,
  expensesData,
  setExpensesData,
  currentPage,
  setDeletedData,
  setModal,
  changeDate,
  loading,
  startDate,
  endDate,
  isAbleDelete,
}) => {
  return (
    <>
      <TableHeader
        currentPage={currentPage}
        setPageSize={setPageSize}
        countPage={countPage}
        setCurrentPage={setCurrentPage}
        dataCount={dataCount}
        getExpenseExcel={getExpenseExcel}
        changeDate={changeDate}
        loading={loading}
        startDate={startDate}
        endDate={endDate}
      />
      <TableHead
        currentPayments={expensesData}
        setCurrentPayments={setExpensesData}
        isAbleDelete={isAbleDelete}
      />
      {expensesData &&
        expensesData.map((expense, index) => {
          return (
            <Rows
              currentPage={currentPage}
              index={index}
              expense={expense}
              setModal={setModal}
              setDeletedData={setDeletedData}
              key={index}
              isAbleDelete={isAbleDelete}
            />
          );
        })}
    </>
  );
};
