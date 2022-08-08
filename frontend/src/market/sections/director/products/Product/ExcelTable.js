import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ products }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t('Kategoriyasi')}</th>
            <th className='border'>{t('Kodi')}</th>
            <th className='border'>{t('Nomi')}</th>
            <th className='border'>{t('Soni ')}</th>
            <th className='border'>{t("O'lchov birligi")}</th>
            <th className='border'>{t('Kelish narxi USD')}</th>
            <th className='border'>{t('Kelish narxi UZS')}</th>
            <th className='border'>{t('Sotish narxi USD')}</th>
            <th className='border'>{t('Sotish narxi UZS')}</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              <tr key={index}>
                <td className='font-bold border'>{index + 1}</td>
                <td>{product.category.code}</td>
                <td>{product.productdata.code}</td>
                <td>{product.productdata.name}</td>
                <td>{product.total}</td>
                <td>{product.unit.name}</td>
                <td>{product.price.incomingprice}</td>
                <td>{product.price.incomingpriceuzs}</td>
                <td>{product.price.sellingprice}</td>
                <td>{product.price.sellingpriceuzs}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
