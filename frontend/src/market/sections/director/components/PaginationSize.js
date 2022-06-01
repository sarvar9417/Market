import { t } from "i18next";
import React from "react";

export const PaginationSize = ({ setPageSize }) => {
  return (
    <select
      className='rounded px-2 py-1 font-bold border border-blue-800 focus:outline focus:outline-blue-800'
      placeholder={t("Bo'limni tanlang")}
      onChange={setPageSize}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  );
};
