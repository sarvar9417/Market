import { t } from "i18next";
import React from "react";
import { SortDoubleProperty } from "../../components/SortDoubleProperty";
import { Sort } from "../productComponents/Sort";

export const TableHead = ({ currentProductTypes, setCurrentProductTypes }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center col-span-2'>
        {t("Kategoriyasi")}
        <SortDoubleProperty
          innnerProperty={"code"}
          property={"category"}
          data={currentProductTypes}
          setData={setCurrentProductTypes}
        />
      </li>
      <li className='th border-r col-span-5 flex justify-center'>
        {t("Nomi")}{" "}
        <Sort
          property={"name"}
          data={currentProductTypes}
          setData={setCurrentProductTypes}
        />
      </li>
      <li className='th col-span-2 border-r'>{t("Tahrirlash")}</li>
      <li className='th col-span-2'>{t("O'chirish")}</li>
    </ul>
  );
};
