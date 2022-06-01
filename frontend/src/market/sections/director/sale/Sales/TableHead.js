import { t } from "i18next";
import React from "react";
import { Sort } from "../../components/Sort";

export const TableHead = () => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center'>
        {t("Sana")}
        <Sort
          property={"createdAt"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li>
      <li className='th border-r flex justify-center'>
        {t("Mijoz")}
        <Sort
          property={"id"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li>
      {/* <li className='th border-r flex justify-center'>
        {t("Mahsulot")}
        <Sort
          property={"name"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li> */}
      <li className='th border-r flex justify-center col-span-2'>
        {t("Jami")}
        <Sort
          property={"totalprice"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li>
      <li className='th border-r flex justify-center col-span-2'>
        {t("Qarz")}
        <Sort
          property={"totalprice"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li>
      <li className='th border-r flex justify-center col-span-2'>
        {t("Chegirma")}
        <Sort
          property={"totalprice"}
          //   data={currentCategories}
          //   setData={setCurrentCategories}
        />
      </li>

      <li className='th  border-r'>{t("Chek")}</li>
      <li className='th  border-r'>{t("Qo'shish")}</li>
      <li className='th  border-r'>{t("Qaytarish")}</li>
    </ul>
  );
};
