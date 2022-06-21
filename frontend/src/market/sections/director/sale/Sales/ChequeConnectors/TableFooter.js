import { t } from "i18next";
import React from "react";

export const TableFooter = ({ sales }) => {
  return (
    <table className='table'>
      <tfoot className='text-base'>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("Jami")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.products
              .reduce((summ, product) => {
                return summ + product.totalprice;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("To'langan")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.payments
              .reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("Chegirma")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.discounts
              .reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0)
              .toLocaleString('ru-RU')}{' '}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("Qarz")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {(
              sales.products.reduce((summ, product) => {
                return summ + product.totalprice;
              }, 0) -
              sales.payments.reduce((summ, payment) => {
                return summ + payment.payment;
              }, 0) -
              sales.discounts.reduce((summ, discount) => {
                return summ + discount.discount;
              }, 0)
            ).toLocaleString('ru-RU')}{' '}
            USD
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
