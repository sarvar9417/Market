import React from 'react';

export const Table = ({ sales }) => {
  return (
    <table className='relative text-black border-collapse my-3 w-full'>
      <thead>
        <tr>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            №
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Sanasi
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Kodi
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Mahsulot
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Soni
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Narxi (dona)
          </th>
          <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
            Jami
          </th>
        </tr>
      </thead>
      <tbody>
        {sales.products.map((product, index) => {
          return (
            <tr key={index}>
              <td className='font-bold text-center border border-black py-1 px-2'>
                {index + 1}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {product.product.category.code}
              </td>
              <td className='font-bold border border-black py-1 px-2'>
                {product.product.name}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {product.pieces.toLocaleString('de-DE')}
              </td>
              <td className='font-bold text-right border border-black py-1 px-2'>
                {product.unitprice.toLocaleString('de-DE')} USD
              </td>
              <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                {product.totalprice.toLocaleString('de-DE')} USD
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
