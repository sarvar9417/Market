import { t } from 'i18next';
import React from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

export const ExcelDownloadBtn = ({ filename }) => {
  return (
    <div className='excel hidden'>
      <ReactHtmlTableToExcel
        id='reacthtmltoexcel'
        table='excel-product-table'
        sheet='Sheet'
        buttonText='Excel'
        filename={t(filename)}
      />
    </div>
  );
};
