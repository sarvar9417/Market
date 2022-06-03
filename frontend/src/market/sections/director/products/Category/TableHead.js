import { t } from "i18next";
import React from "react";
import { Sort } from "../productComponents/Sort";

export const TableHead = ({ currentCategories, setCurrentCategories }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center'>
        {t("Kodi")}
        <Sort
          property={"code"}
          data={currentCategories}
          setData={setCurrentCategories}
        />
      </li>
      <li className='th border-r col-span-6 flex justify-center'>
        {t("Nomi")}{" "}
        <Sort
          property={"name"}
          data={currentCategories}
          setData={setCurrentCategories}
        />
      </li>
      <li className='th col-span-2 border-r'>{t("Tahrirlash")}</li>
      <li className='th col-span-2'>{t("O'chirish")}</li>
    </ul>
  );
};
