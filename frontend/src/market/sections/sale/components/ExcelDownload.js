import React from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';

export const ExcelDownload = ({ filename }) => {
  return (
    <div className='excel hidden'>
      <ReactHtmlTableToExcel
        id='reacthtmltoexcel'
        table='data-excel-table'
        sheet='Sheet'
        buttonText='Excel'
        filename='filename'
      />
    </div>
  );
};
