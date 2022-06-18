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
            <th>{t('Naqt')} USD</th>
            <th>{t('Naqt')} UZS</th>
            <th>{t('Plastik')} USD</th>
            <th>{t('Plastik')} UZS</th>
            <th>{t("O'tkazma")} USD</th>
            <th>{t("O'tkazma")} UZS</th>
            <th>{t('Jami')} USD</th>
            <th>{t('Jami')} UZS</th>
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
                <td>{Math.round(item.cash * 100) / 100}</td>
                <td>{Math.round(item.cashuzs * 100) / 100}</td>
                <td>{Math.round(item.card * 100) / 100}</td>
                <td>{Math.round(item.carduzs * 100) / 100}</td>
                <td>{Math.round(item.transfer * 100) / 100}</td>
                <td>{Math.round(item.transferuzs * 100) / 100}</td>
                <td>{Math.round(item.payment * 100) / 100}</td>
                <td>{Math.round(item.paymentuzs * 100) / 100}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
