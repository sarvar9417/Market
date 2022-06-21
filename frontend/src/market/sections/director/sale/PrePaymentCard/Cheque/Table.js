import React from 'react';
import { t } from "i18next"

export const Table = ({ sales }) => {
  return (
    <table className='relative text-black border-collapse my-3 w-full'>
      <thead>
        <tr>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            №
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            {t("Sanasi")}
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
        {sales.products.map((product, index) => {
          console.log(product);
          return (
            <tr key={index}>
              <td className='font-bold text-center border border-black py-1 px-2'>
                {index + 1}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {new Date(sales.createdAt).toLocaleDateString()}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {product.product.productdata.code}
              </td>
              <td className='font-bold border border-black py-1 px-2'>
                {product.product.productdata.name}
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
  );
};
