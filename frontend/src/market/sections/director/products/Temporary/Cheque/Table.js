import { t } from 'i18next';
import React from 'react';

export const Table = ({ incomings }) => {
  return (
    <table className='relative text-black border-collapse my-3 w-full'>
      <thead>
        <tr>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            №
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Kodi")}
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Mahsulot")}
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Soni")}
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Narxi (dona)")}
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Jami")}
          </th>
        </tr>
      </thead>
      <tbody>
        {incomings &&
          incomings.map((product, index) => {
            return (
              <tr key={index}>
                <td className='font-bold text-center border border-black py-1 px-2'>
                  {index + 1}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {product.product.code}
                </td>
                <td className='font-bold border border-black py-1 px-2'>
                  {product.product.name}
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
      <tfoot className='text-base'>
        <tr>
          <th colSpan={3} className='p-1  text-right border'>
            {t("Jami")}:
          </th>
          <th className='text-right text-teal-900 py-1 border p-1'>
            {incomings
              .reduce((summ, product) => {
                return summ + product.pieces;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
          </th>
          <th className='text-right text-teal-900 py-1 border p-1'>
            {incomings
              .reduce((summ, product) => {
                return summ + product.unitprice;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
            USD
          </th>
          <th className='text-right text-teal-900 py-1 border p-1'>
            {incomings
              .reduce((summ, product) => {
                return summ + product.totalprice;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
            USD
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
