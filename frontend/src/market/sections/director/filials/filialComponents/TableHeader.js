import React from "react";
import { SearchInput } from "../../components/Input";
import { PaginationSize } from "../../components/PaginationSize";
import { Pagination } from "../../components/Pagination";
import { t } from "i18next";

export const TableHeader = ({
  setPageSize,
  branchInputChange,
  filename,
  countPage,
  totalDatas,
  setCurrentPage,
  keyPressed,
}) => {
  return (
    <ul className="tbody border-b border-t-2 border-blue-800">
      <li className="th-h col-span-1">
        <PaginationSize setPageSize={setPageSize} />
      </li>
      <li className="th-h col-span-3">
        <SearchInput
          name={"branch"}
          type={"text"}
          changeHandler={branchInputChange}
          placeholder={t("Filial")}
          keyPressed={keyPressed}
        />
      </li>
      <li className="th-h col-span-8 flex justify-center">
        <Pagination
          countPage={countPage}
          totalDatas={totalDatas}
          setCurrentPage={setCurrentPage}
        />
      </li>
    </ul>
  );
};
