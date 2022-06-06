import React from "react";
import { SearchInput } from "../../components/Input";
import { PaginationSize } from "../../components/PaginationSize";
import { Pagination } from "../../components/Pagination";
import { ExcelDownload } from "../../components/ExcelDownload";

export const TableHeader = ({
  setPageSize,
  searchCategory,
  setCurrentPage,
  totalDatas,
  countPage,
  nameValue,
  codeValue,
  nameKeyPressed,
  codeKeyPressed,
}) => {
  return (
    <ul className="tbody border-b border-t-2 border-blue-800">
      <li className="th-h border-r">
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className="th-h border-r">
        <SearchInput
          changeHandler={searchCategory}
          type={"search"}
          placeholder={"Kategoriya kodi"}
          name="code"
          value={codeValue}
          keyPressed={codeKeyPressed}
        />
      </li>
      <li className="th-h col-span-4">
        <SearchInput
          changeHandler={searchCategory}
          type={"search"}
          placeholder={"Kategoriya nomi"}
          name="name"
          value={nameValue}
          keyPressed={nameKeyPressed}
        />
      </li>
      <li className="th-h border-r col-span-4 ">
        <Pagination
          setCurrentPage={setCurrentPage}
          countPage={countPage}
          totalDatas={totalDatas}
        />
      </li>
      <li className="text-center flex justify-center items-center font-bold border-r py-2 col-span-2 bg-white">
        <ExcelDownload filename={"Kategoriya"} />
      </li>
    </ul>
  );
};
