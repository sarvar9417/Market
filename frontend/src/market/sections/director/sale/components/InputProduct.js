import React from "react";

export const InputProduct = ({ setCounts, product }) => {
  return (
    <div>
      <p className='font-bold'>
        {product &&
          product.product.category.code +
            " - " +
            product.product.code +
            " " +
            product.product.name}{" "}
      </p>
      <table className='table'>
        <thead>
          <tr>
            <th className='border text-base p-0 font-bold'>Soni</th>
            <th className='border text-base p-0 font-bold'>Narxi</th>
            <th className='border text-base p-0 font-bold'>Jami</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border text-base p-0 font-bold px-2'>
              <input
                type='number'
                onChange={setCounts}
                name='pieces'
                value={product ? product.pieces : ""}
                className='w-full outline-none text-right font-bold'
              />
            </td>
            <td className='border text-base p-0 font-bold px-2'>
              <input
                type='number'
                onChange={setCounts}
                name='unitprice'
                value={product ? product.unitprice : ""}
                className='w-full outline-none text-right font-bold'
              />
            </td>
            <td className='border text-base p-0 font-bold px-2 w-1/3'>
              {product && product.totalprice.toFixed(2)} $
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
