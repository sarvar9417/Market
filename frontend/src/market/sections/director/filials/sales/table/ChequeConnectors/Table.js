import { t } from 'i18next';
import React from 'react';
import { TableFooter } from './TableFooter';

export const Table = ({ sales, currentSales, returnSales }) => {
  return (
    <>
      <div className='mt-3 mb-2 ml-2 font-bold text-lg'>Sotilganlar:</div>
      <table className=' text-black border-collapse w-full mb-3 '>
        <thead>
          <tr>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              №
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Sana')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Kodi')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Mahsulot')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Soni')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Narxi (dona)')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
              {t('Jami')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSales.map((product, index) => {
            return (
              <tr key={index}>
                <td className='font-bold text-center border border-black py-1 px-2'>
                  {index + 1}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {product.product && product.product.productdata.code}
                </td>
                <td className='font-bold border border-black py-1 px-2'>
                  {product.product && product.product.productdata.name}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {product.pieces.toLocaleString('ru-RU')}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {product.unitprice.toLocaleString('ru-RU')} USD
                </td>
                <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                  {product.totalprice.toLocaleString('ru-RU')} USD
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TableFooter sales={sales} />

      {returnSales.length > 0 && (
        <>
          <div className='mt-3 mb-2 ml-2 font-bold text-lg'>
            Qaytarilganlar:
          </div>
          <table className='relative text-black border-collapse w-full mb-3'>
            <thead>
              <tr>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  №
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Sana')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Kodi')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Mahsulot')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Soni')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Narxi (dona)')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center px-2 bg-white'>
                  {t('Jami')}
                </th>
              </tr>
            </thead>
            <tbody>
              {returnSales.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className='font-bold text-center border border-black py-1 px-2'>
                      {index + 1}
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2'>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2'>
                      {product.product && product.product.productdata.code}
                    </td>
                    <td className='font-bold border border-black py-1 px-2'>
                      {product.product && product.product.productdata.name}
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2'>
                      {product.pieces.toLocaleString('ru-RU')}
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2'>
                      {product.unitprice.toLocaleString('ru-RU')} USD
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                      {product.totalprice.toLocaleString('ru-RU')} USD
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className='table'>
            <tfoot className='text-base'>
              <tr>
                <th colSpan={6} className='py-1'>
                  Qaytarilganlar jami:
                </th>
                <th className='text-right text-teal-900 py-1'>
                  {(
                    returnSales.reduce(
                      (prev, sale) => prev + sale.totalprice,
                      0
                    ) || 0
                  ).toLocaleString('ru-RU')}{' '}
                  USD
                </th>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </>
  );
};
