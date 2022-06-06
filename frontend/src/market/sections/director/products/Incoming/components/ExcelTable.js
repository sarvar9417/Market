import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ data }) => {
  return (
    <>
      <table className='hidden' id='data-excel-table'>
        <thead>
          <tr>
            <th className='border-righ'>№</th>
            <th className='border-righ'>{t('Yetkazib beruvchi')}</th>
            <th className='border-righ'>{t('Kategoriya')}</th>
            <th className='border-righ'>{t('Mahsulot turi')}</th>
            <th className='border-righ'>{t('Brend')}</th>
            <th className='border-righ'>{t('Mahsulot kodi')}</th>
            <th className='border-righ'>{t('Mahsulot nomi')}</th>
            <th className='border-righ'>{t('Soni')}</th>
            <th className='border-righ'>{t("O'l.B.")}</th>
            <th className='border-righ'>{t('Narxi')}</th>
            <th className='border-righ'>{t('Umumiy narxi')}</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((p, ind) => (
              <tr key={ind}>
                <td className='border-right font-weight-bold'>{ind + 1}</td>
                <td className='border-right'>{p.supplier.name}</td>
                <td className='border-right'>
                  {p.category.code} {p.category.name}
                </td>
                <td>
                  {p.producttype.code} {p.producttype.name}
                </td>
                <td>{p.brand && p.brand.name}</td>
                <td className='border-right'>{p.product.code}</td>
                <td className='border-right'>{p.product.name}</td>
                <td className='border-right'>
                  {Math.round(p.pieces * 100) / 100}
                </td>
                <td>{p.unit.name}</td>
                <td className='border-right'>
                  {Math.round(p.unitprice * 100) / 100}
                </td>
                <td className='border-right'>
                  {Math.round(p.totalprice * 100) / 100}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th className='text-right' colSpan={10}>
              {t('Jami')}
            </th>
            <th className='text-right'>
              {data.reduce((summ, product) => {
                return summ + product.totalprice;
              }, 0)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
