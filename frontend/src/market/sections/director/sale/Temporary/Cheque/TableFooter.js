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
      </tfoot>
    </table>
  );
};
