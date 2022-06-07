import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t('Sana')}</th>
            <th>{t('Yetkazib beruvchi')}</th>
            <th>{t('Kategoriya kodi')}</th>
            <th>{t('Kategoriya nomi')}</th>
            <th>{t('Mahsulot turi')}</th>
            <th>{t('Mahsulot kodi')}</th>
            <th>{t('Mahsulot nomi')}</th>
            <th>{t('Mahsulot brendi')}</th>
            <th>{t('Soni')}</th>
            <th>{t('Narxi (1 dona)')}</th>
            <th>{t('Narxi (jami)')}</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.supplier.name}</td>
                <td>{item.category.code}</td>
                <td>{item.category.name}</td>
                <td>{item.producttype.name}</td>
                <td>{item.product.code}</td>
                <td>{item.product.name}</td>
                <td>{item.brand && item.brand.name}</td>
                <td>{Math.round(item.pieces * 100) / 100}</td>
                <td>{Math.round(item.unitprice * 100) / 100}</td>
                <td>{Math.round(item.totalprice * 100) / 100}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
