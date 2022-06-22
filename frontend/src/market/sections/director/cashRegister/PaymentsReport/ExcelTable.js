import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas, type }) => {
  if (type === 'allpayments') {
    return (
      <div className='hidden'>
        <table className='table m-0' id='data-excel-table'>
          <thead>
            <tr className='bg-blue-700'>
              <th className='border border-black'>№</th>
              <th>{t('Sana')}</th>
              <th>{t('Mijoz')}</th>
              <th>{t('Naqt')}</th>
              <th>{t('Plastik')}</th>
              <th>{t("O'tkazma")}</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    {item.saleconnector.client &&
                      item.saleconnector.client.name}
                  </td>
                  <td>{item.cash}</td>
                  <td>{item.card}</td>
                  <td>{item.transfer}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
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
                <td>{item.payment}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
