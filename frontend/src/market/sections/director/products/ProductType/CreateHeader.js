import { t } from "i18next";
import React from "react";

export const CreateHeader = () => {
  return (
    <ul className='thead'>
      <li className='th col-span-4 border-r'>{t("Kategoriyani tanlang")}</li>
      <li className='th col-span-4 border-r'>{t("Mahsulot")}</li>
      <li className='th col-span-2 border-r'>{t("Saqlash")}</li>
      <li className='th col-span-2'>{t("Tozalash")}</li>
    </ul>
  );
};
