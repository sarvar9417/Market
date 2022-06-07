import { t } from "i18next";
import React from "react";

export const CreateHeader = () => {
  return (
    <ul className='thead'>
      <li className='th col-span-8 border-r'>{t("O'lchov birligi")}</li>
      <li className='th col-span-2 border-r'>{t("Saqlash")}</li>
      <li className='th col-span-2'>{t("Tozalash")}</li>
    </ul>
  );
};
