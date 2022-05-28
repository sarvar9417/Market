import {
  faMoneyCheckDollar,
  faPenAlt,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Select from "react-select";

export const EditSelling = ({
  changeBack,
  editSaleConnector,
  checkNumber,
  payment,
  debt,
  discount,
  totalprice,
  setVisible,
  editProducts,
  saleproducts,
  packmans,
  clients,
  changePackman,
  changeClient,
  inputClient,
}) => {
  const [btn, setBtn] = useState(true);
  return (
    <div className=' bg-white mb-3'>
      <p className='bg-teal-500 text-center text-2xl text-white py-2 font-bold'>
        CHEK: № A{1000001 + checkNumber.count}
      </p>
      <div className='px-3 py-2'>
        <div className='max-h-96 overflow-y-scroll'>
          <table className='bg-white w-full text-base relative min-w-[700px]'>
            <thead className='z-10 border text-center text-base  text-white py-4'>
              <tr>
                <th className='border sticky top-0 bg-teal-500'>№</th>
                <th className='border sticky top-0 bg-teal-500'>
                  Kategoriyasi
                </th>
                <th className='border sticky top-0 bg-teal-500'>Nomi</th>
                <th className='border sticky top-0 bg-teal-500'>
                  Xarid qilingan
                </th>

                <th className='border sticky top-0 bg-teal-500'>Narxi</th>
                <th className='border sticky top-0 bg-teal-500'>Back</th>
                <th className='border sticky top-0 bg-teal-500'>Narxi</th>
              </tr>
            </thead>
            <tbody className='border text-black'>
              {editSaleConnector.products.map((product, index) => {
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
        </div>
        <div className='flex'>
          <div className='py-3 text-lg w-4/5'>
            <div className='flex justify-between '>
              <span className='text-black font-bold'>Umumiy summa:</span>
              <span className='text-black font-bold'>
                {totalprice.toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-black font-bold'>Chegirma:</span>
              <span className='text-yellow-500 font-bold'>
                {discount.discount.toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-black font-bold'>Qarz:</span>
              <span className='text-yellow-500 font-bold'>
                {Math.abs(debt.debt).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-black font-bold'>To'lanayotgsan:</span>
              <span className='text-green-700 font-bold'>
                {(
                  payment.cash +
                  payment.card +
                  payment.transfer
                ).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setVisible(true)}
            className='w-1/5 my-4 ml-3 bg-teal-500 text-white rounded font-bold text-4xl'>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
          </button>
        </div>
      </div>
    </div>
  );
};
