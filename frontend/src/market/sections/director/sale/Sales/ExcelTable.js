import { t } from "i18next";
import React from "react";

export const ExcelTable = ({ saleconnectors }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t("Sana")}</th>
            <th className='border'>{t("Mijoz")}</th>
            <th className='border'>{t("Jami")}</th>
            <th className='border'>{t("To'langan")}</th>
            <th className='border'>{t("Chegirma")}</th>
            <th className='border'>{t("Qarz")}</th>
          </tr>
        </thead>
        <tbody>
          {saleconnectors &&
            saleconnectors.map((saleconnector, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {new Date(saleconnector.createdAt).toLocaleDateString()}
                </td>
                <td>{saleconnector.client && saleconnector.client.name}</td>
                <td>
                  <span>
                    {saleconnector.products.reduce((summ, product) => {
                      return summ + product.totalprice;
                    }, 0)}
                  </span>
                  {"  "}
                  <span className='text-green-900'>USD</span>
                </td>
                <td>
                  <span>
                    {saleconnector.payments.reduce((summ, payment) => {
                      return summ + payment.payment;
                    }, 0)}
                  </span>
                  {"  "}
                  <span className='text-green-900'>USD</span>
                </td>
                <td>
                  <span>
                    {saleconnector.products.reduce((summ, product) => {
                      return summ + product.totalprice;
                    }, 0) -
                      saleconnector.payments.reduce((summ, payment) => {
                        return summ + payment.payment;
                      }, 0) -
                      saleconnector.discounts.reduce((summ, discount) => {
                        return summ + discount.discount;
                      }, 0)}
                  </span>
                  {"  "}
                  <span className='text-red-600'>USD</span>
                </td>
                <td>
                  <span>
                    {saleconnector.discounts.reduce((summ, discount) => {
                      return summ + discount.discount;
                    }, 0)}
                  </span>
                  {"  "}
                  <span className='text-orange-600'>USD</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
