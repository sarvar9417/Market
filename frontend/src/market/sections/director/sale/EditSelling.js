import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const EditSelling = ({
  sellingEditCard,
  changeBack,
  editSaleConnector,
  checkNumber,
  payment,
  discount,
  totalprice,
  setVisible,
  saleproducts,
}) => {
  return (
    <div className={`bg-white mb-3 ${sellingEditCard ? "" : "hidden"}`}>
      <p className='bg-blue-800 text-center text-2xl text-white py-2 font-bold'>
        CHEK: № A{1000001 + checkNumber.count}
      </p>
      <div className='px-3 py-2'>
        <div className='max-h-96 overflow-y-scroll'>
          <table className='bg-white w-full text-base relative min-w-[700px]'>
            <thead className='z-10 border text-center text-base  text-white py-4'>
              <tr>
                <th className='border sticky top-0 bg-blue-800'>№</th>
                <th className='border sticky top-0 bg-blue-800'>
                  Kategoriyasi
                </th>
                <th className='border sticky top-0 bg-blue-800'>Nomi</th>
                <th className='border sticky top-0 bg-blue-800'>
                  Xarid qilingan
                </th>

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
        </div>
        <div className='flex'>
          <div className='py-3 text-lg w-4/5'>
            <div className='flex justify-between '>
              <span className='text-black font-bold'>Umumiy summa:</span>
              <span className='text-black font-bold'>
                {(Math.round(totalprice * 100) / 100).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-black font-bold'>Chegirma:</span>
              <span className='text-yellow-500 font-bold'>
                {Math.round(
                  discount.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0) * 100
                ) / (100).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>

            <div className='flex justify-between'>
              <span className='text-black font-bold'>To'langan:</span>
              <span className='text-green-700 font-bold'>
                {Math.round(
                  payment.reduce((summ, payment) => {
                    return summ + payment.payment;
                  }, 0) * 100
                ) / (100).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-black font-bold'>Farq:</span>
              <span className='text-yellow-500 font-bold'>
                {(
                  Math.round(
                    (totalprice -
                      discount.reduce((summ, discount) => {
                        return summ + discount.discount;
                      }, 0) -
                      payment.reduce((summ, payment) => {
                        return summ + payment.payment;
                      }, 0)) *
                      100
                  ) / 100
                ).toLocaleString("de-DE")}{" "}
                <span className='text-teal-600'>USD</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setVisible(true)}
            className='w-1/6 my-4 ml-3 bg-blue-800 text-white rounded-xl font-bold text-6xl'>
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
          </button>
        </div>
      </div>
    </div>
  );
};
