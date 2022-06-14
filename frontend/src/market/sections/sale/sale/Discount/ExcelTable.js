import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th>{t('Sana')}</th>
            <th>{t('Mijoz')}</th>
            <th>{t('Jami')} USD</th>
            <th>{t('Jami')} UZS</th>
            <th>{t('Chegirma')} USD</th>
            <th>{t('Chegirma')} UZS</th>
            <th>{t('Chegirma')} %</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  {item.saleconnector.client && item.saleconnector.client.name}
                </td>
                <td>{Math.round(item.totalprice * 100) / 100}</td>
                <td>{Math.round(item.totalpriceuzs * 100) / 100}</td>
                <td>{Math.round(item.discount * 100) / 100}</td>
                <td>{Math.round(item.discountuzs * 100) / 100}</td>
                <td>{Math.round(item.procient * 100) / 100}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
