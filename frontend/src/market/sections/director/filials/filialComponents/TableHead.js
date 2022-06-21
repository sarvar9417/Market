import React from "react";
import { Sort } from "../../components/Sort";
import { t } from "i18next";

export const TableHead = ({ data, setData }) => {
  return (
    <ul className="thead">
      <li className="th border-r col-span-1">№</li>
      <li className="th border-r col-span-3 flex justify-center">
        {t("Filial nomi")}
        <Sort property={"name"} data={data} setData={setData} />
      </li>
      <li className="th border-r col-span-3 flex justify-center">
        {t("Telefon raqami")}
        <Sort property={"phone1"} data={data} setData={setData} />
      </li>
      <li className="th border-r col-span-3 flex justify-center">
        {t("Do'kon nomi")}
        <Sort property={"market"} data={data} setData={setData} />
      </li>
      <li className="th border-r col-span-2">{t("Tahrirlash")}</li>
    </ul>
  );
};
