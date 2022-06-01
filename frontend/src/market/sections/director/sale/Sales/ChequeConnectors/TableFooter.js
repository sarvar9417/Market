import React from "react";

export const TableFooter = ({ sales }) => {
  return (
    <table className='table'>
      <tfoot className='text-base'>
        <tr>
          <th colSpan={6} className='py-1'>
            Jami:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.products
              .reduce((summ, product) => {
                return summ + product.totalprice;
              }, 0)
              .toLocaleString("de-DE")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            To'langan:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.payments
              .reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)
              .toLocaleString("de-DE")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            Chegirma:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.discounts
              .reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0)
              .toLocaleString("de-DE")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            Qarz:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.debts
              .reduce((summ, debt) => {
                return summ + debt.debt;
              }, 0)
              .toLocaleString("de-DE")}{" "}
            USD
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
