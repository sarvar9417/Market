import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas, type }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th>{t('Sana')}</th>
            <th>{t('Mijoz')}</th>
            <th>
              {(type === 'cash' && t('Naqt')) ||
                (type === 'card' && t('Plastik')) ||
                (type === 'transfer' && t("O'tkazma"))}{' '}
              USD
            </th>
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
                <td>
                  {Math.round(
                    (type === 'cash' && item.cash) ||
                      (type === 'card' && item.card) ||
                      (type === 'transfer' && item.transfer)
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
