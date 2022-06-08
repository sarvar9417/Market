import { t } from 'i18next';
import React from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

export const ExcelDownloadBtn = ({ filename, excelRef }) => {
  return (
    <div className='excel hidden'>
      <ReactHtmlTableToExcel
        id='exceltotable'
        table='excel-product-table'
        sheet='seet'
        buttonText='excel'
        filename={t(filename)}
        ref={excelRef}
      />
    </div>
  );
};
