import React from 'react';
import { t } from 'i18next';

export const Table = ({ editSaleConnector, saleproducts, changeBack, loading }) => {
  return (
    <table className='bg-white w-full relative text-base'>
      <thead className='border text-center text-base text-white py-4'>
        <tr>
          <th className='border static top-0 bg-blue-800'>№</th>
          <th className='border static top-0 bg-blue-800'>{t('Kodi')}</th>
          <th className='border static top-0 bg-blue-800'>{t('Nomi')}</th>
          <th className='border static top-0 bg-blue-800'>
            {t('Xarid qilingan')}
          </th>

          <th className='border static top-0 bg-blue-800'>{t('Narxi')}</th>
          <th className='border static top-0 bg-blue-800'>{t('Qaytarish')}</th>
          <th className='border static top-0 bg-blue-800'>{t('Narxi')}</th>
        </tr>
      </thead>
      <tbody className='border text-black'>
        {editSaleConnector.products &&
          editSaleConnector.products.map((product, index) => {
            return (
              <tr key={index}>
                <td className='border font-bold text-black text-center w-10'>
                  {index + 1}
                </td>
                <td className='border font-bold text-black text-center w-10'>
                  {product.product.productdata.code}
                </td>
                <td className='border font-bold text-black px-1'>
                  {product.product.productdata.name}
                </td>
                <td className='border font-bold text-black text-right px-2 w-14'>
                  {product.pieces}
                </td>
                <td className='border font-bold text-black text-right px-2 w-36'>
                  {product.totalprice.toLocaleString('ru-RU')}{' '}
                  <span className='text-teal-600'>USD</span>
                </td>
                <td className='border font-bold text-black text-right px-2 w-20'>
                  <input
                    value={saleproducts[index].pieces}
                    id={index}
                    type='number'
                    loading={loading}
                    onChange={changeBack}
                    className='w-full border outline-none rounded font-bold text-right px-2'
                  />
                </td>
                <td className='border font-bold text-black text-right px-2 w-36'>
                  {saleproducts[index].totalprice.toLocaleString('ru-RU')}{' '}
                  <span className='text-teal-600'>USD</span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
