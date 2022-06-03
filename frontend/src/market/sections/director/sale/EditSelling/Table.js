import React from "react";

export const Table = ({ editSaleConnector, saleproducts, changeBack }) => {
  return (
    <table className='bg-white w-full text-base relative min-w-[700px]'>
      <thead className='z-10 border text-center text-base  text-white py-4'>
        <tr>
          <th className='border sticky top-0 bg-blue-800'>№</th>
          <th className='border sticky top-0 bg-blue-800'>Kategoriyasi</th>
          <th className='border sticky top-0 bg-blue-800'>Nomi</th>
          <th className='border sticky top-0 bg-blue-800'>Xarid qilingan</th>

          <th className='border sticky top-0 bg-blue-800'>Narxi</th>
          <th className='border sticky top-0 bg-blue-800'>Back</th>
          <th className='border sticky top-0 bg-blue-800'>Narxi</th>
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
                  {product.product.category.code}
                </td>
                <td className='border font-bold text-black px-1'>
                  {product.product.name}
                </td>
                <td className='border font-bold text-black text-right px-2 w-14'>
                  {product.pieces}
                </td>
                <td className='border font-bold text-black text-right px-2 w-36'>
                  {product.totalprice.toLocaleString("de-DE")}{" "}
                  <span className='text-teal-600'>USD</span>
                </td>
                <td className='border font-bold text-black text-right px-2 w-20'>
                  <input
                    value={saleproducts[index].pieces}
                    id={index}
                    type='number'
                    onChange={changeBack}
                    className='w-full border outline-none rounded font-bold text-right px-2'
                  />
                </td>
                <td className='border font-bold text-black text-right px-2 w-36'>
                  {saleproducts[index].totalprice.toLocaleString("de-DE")}{" "}
                  <span className='text-teal-600'>USD</span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
