import React from "react";
// import { SearchInput } from "../../components/Input";
import { PaginationSize } from "../../components/PaginationSize";
import { Pagination } from "../../components/Pagination";
import { ExcelDownload } from "../../components/ExcelDownload";

export const TableHeader = ({
  changeDate,
  startDate,
  endDate,
  setPageSize,
  setCurrentPage,
  categoryCount,
  countPage,
}) => {
  return (
    <ul className='tbody border-b border-t-2 border-blue-800'>
      <li className='th-h border-r'>
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className='th-h border-r'></li>
      <li className='th-h border-r'>
        {/* <SearchInput
          // changeHandler={searchCategory}
          type={"search"}
          placeholder={"Mijoz"}
          name='searchCategory'
        /> */}
      </li>
      {/* <li className='th-h border-r'>
        <SearchInput
          // changeHandler={searchCategory}
          type={"search"}
          placeholder={"Mahsulotlar"}
          name='searchCategory'
        />{" "}
      </li> */}
      <li className='th-h col-span-8'>
        <input
          onChange={changeDate}
          defaultValue={new Date(startDate).toISOString().slice(0, 10)}
          type='date'
          name='startDate'
          className='border rounded p-1 focus:outline-green-800'
        />
        <input
          onChange={changeDate}
          defaultValue={new Date(endDate).toISOString().slice(0, 10)}
          type='date'
          name='endDate'
          className='border rounded p-1 focus:outline-green-800 ml-2'
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={categoryCount.count}
        />
      </li>
      <li className='text-center flex justify-center items-center font-bold py-2 bg-white'>
        <ExcelDownload filename={"Sotuvlar"} />
      </li>
    </ul>
  );
};
