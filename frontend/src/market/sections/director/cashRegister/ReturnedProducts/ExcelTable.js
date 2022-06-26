import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ saleconnectors }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t('ID')}</th>
            <th className='border'>{t('Mijoz')}</th>
            <th className='border'>{t('Soni')}</th>
            <th className='border'>{t('Narxi')}</th>
            <th className='border'>{t('Jami')}</th>
          </tr>
        </thead>
        <tbody>
          {saleconnectors &&
            saleconnectors.map((saleconnector, index) => (
              <tr key={index}>
                <td className='font-bold border'>{index + 1}</td>
                <td>
                  {new Date(saleconnector.createdAt).toLocaleDateString()}
                </td>
                <td>{saleconnector.client && saleconnector.client.name}</td>
                <td>
                  <span>{saleconnector.pieces.toLocaleString('ru-RU')}</span>
                </td>
                <td>
                  <span>{saleconnector.unitprice.toLocaleString('ru-RU')}</span>
                </td>
                <td>
                  <span>
                    {saleconnector.totalprice.toLocaleString('ru-RU')}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
