import { t } from 'i18next';
import React from 'react';
import { TableFooter } from './TableFooter';

export const Table = ({ sales, currentSales, returnSales, currency }) => {
  return (
    <>
      <div className='mt-3 mb-2 ml-2 font-bold text-lg'>Sotilganlar:</div>
      <table className='relative text-black border-collapse w-full mb-3 '>
        <thead>
          <tr>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              №
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Sana')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Kodi')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Mahsulot')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Soni')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Narxi (dona)')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
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
                  {currency === 'UZS'
                    ? product.unitpriceuzs.toLocaleString('ru-RU')
                    : product.unitprice.toLocaleString('ru-RU')}{' '}
                  {currency}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                  {currency === 'UZS'
                    ? product.totalpriceuzs.toLocaleString('ru-RU')
                    : product.totalprice.toLocaleString('ru-RU')}{' '}
                  {currency}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className='table mb-6'>
        <tfoot className='text-base'>
          <tr>
            <th className='text-right text-teal-900 py-1'>
              <span className='mr-4'>Sotilganlar jami:</span>
              <span>
                {currency === 'UZS'
                  ? (
                      currentSales.reduce(
                        (prev, sale) => prev + sale.totalpriceuzs,
                        0
                      ) || 0
                    ).toLocaleString('ru-RU')
                  : (
                      currentSales.reduce(
                        (prev, sale) => prev + sale.totalprice,
                        0
                      ) || 0
                    ).toLocaleString('ru-RU')}{' '}
                {currency}
              </span>
            </th>
          </tr>
        </tfoot>
      </table>

      {returnSales.length > 0 && (
        <>
          <div className='mt-3 mb-2 ml-2 font-bold text-lg'>
            Qaytarilganlar:
          </div>
          <table className='relative text-black border-collapse w-full mb-3'>
            <thead>
              <tr>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  №
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  {t('Sana')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  {t('Kodi')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  {t('Mahsulot')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  {t('Soni')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
                  {t('Narxi (dona)')}
                </th>
                <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
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
                      {currency === 'UZS'
                        ? product.unitpriceuzs.toLocaleString('ru-RU')
                        : product.unitprice.toLocaleString('ru-RU')}{' '}
                      {currency}
                    </td>
                    <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                      {currency === 'UZS'
                        ? product.totalpriceuzs.toLocaleString('ru-RU')
                        : product.totalprice.toLocaleString('ru-RU')}{' '}
                      {currency}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className='table mb-8'>
            <tfoot className='text-base'>
              <tr>
                <th className='text-right text-teal-900 py-1'>
                  <span className='mr-4'>Qaytarilganlar jami:</span>
                  <span>
                    {currency === 'UZS'
                      ? (
                          returnSales.reduce(
                            (prev, sale) => prev + sale.totalpriceuzs,
                            0
                          ) || 0
                        ).toLocaleString('ru-RU')
                      : (
                          returnSales.reduce(
                            (prev, sale) => prev + sale.totalprice,
                            0
                          ) || 0
                        ).toLocaleString('ru-RU')}{' '}
                    {currency}
                  </span>
                </th>
              </tr>
            </tfoot>
          </table>
        </>
      )}
      <TableFooter sales={sales} currency={currency} />
    </>
  );
};
