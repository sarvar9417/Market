import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t('Kategoriya kodi')}</th>
            <th>{t('Kategoriya nomi')}</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.category.code}</td>
                <td>{item.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
