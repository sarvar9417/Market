import React from "react";
import { t } from "i18next"

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
              .toLocaleString("ru-RU")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("To'langan")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.payment.payment &&
              sales.payment.payment.toLocaleString("ru-RU")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("Chegirma")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.discount &&
              sales.discount.discount &&
              sales.discount.discount.toLocaleString("ru-RU")}{" "}
            USD
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("Qarz")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.debt &&
              sales.debt.debt &&
              sales.debt.debt.toLocaleString("ru-RU")}{" "}
            USD
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
