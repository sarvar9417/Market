import { t } from "i18next";
import React from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

export const ExcelDownload = ({filename}) => {
  return (
    <div className='excel'>
      <ReactHtmlTableToExcel
        id='reacthtmltoexcel'
        table='category-excel-table'
        sheet='Sheet'
        buttonText='Excel'
        filename={t(filename)}
      />
    </div>
  );
};
