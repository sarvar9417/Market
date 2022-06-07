import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ saleconnectors }) => {
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr className='bg-blue-700'>
            <th className='border border-black'>№</th>
            <th className='border'>{t('Sana')}</th>
            <th className='border'>{t('Mijoz')}</th>
            <th className='border'>{t('Jami  USD')}</th>
            <th className='border'>{t('Jami UZS')}</th>
            <th className='border'>{t("To'langan USD")}</th>
            <th className='border'>{t("To'langan UZS")}</th>
            <th className='border'>{t('Chegirma USD')}</th>
            <th className='border'>{t('Chegirma UZS')}</th>
            <th className='border'>{t('Qarz USD')}</th>
            <th className='border'>{t('Qarz UZS')}</th>
          </tr>
        </thead>
        <tbody>
          {saleconnectors &&
            saleconnectors.map((saleconnector, index) => (
              <tr key={index}>
                <td className='font-bold border'>{index + 1}</td>
                <td>
                  {new Date(saleconnector.createdAt).toLocaleDateString()}
                </td>
                <td>{saleconnector.client && saleconnector.client.name}</td>
                <td>
                  <span>
                    {saleconnector.products
                      .reduce((summ, product) => {
                        return summ + product.totalprice;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                </td>
                <td>
                  <span>
                    {saleconnector.products
                      .reduce((summ, product) => {
                        return summ + product.totalpriceuzs;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                </td>
                <td>
                  <span>
                    {saleconnector.payments
                      .reduce((summ, payment) => {
                        return summ + payment.payment;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
                <td>
                  <span>
                    {saleconnector.payments
                      .reduce((summ, payment) => {
                        return summ + payment.paymentuzs;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
                <td>
                  <span>
                    {saleconnector.discounts
                      .reduce((summ, discount) => {
                        return summ + discount.discount;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
                <td>
                  <span>
                    {saleconnector.discounts
                      .reduce((summ, discount) => {
                        return summ + discount.discountuzs;
                      }, 0)
                      .toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
                <td>
                  <span>
                    {(
                      saleconnector.products.reduce((summ, product) => {
                        return summ + product.totalprice;
                      }, 0) -
                      saleconnector.payments.reduce((summ, payment) => {
                        return summ + payment.payment;
                      }, 0) -
                      saleconnector.discounts.reduce((summ, discount) => {
                        return summ + discount.discount;
                      }, 0)
                    ).toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
                <td>
                  <span>
                    {(
                      saleconnector.products.reduce((summ, product) => {
                        return summ + product.totalpriceuzs;
                      }, 0) -
                      saleconnector.payments.reduce((summ, payment) => {
                        return summ + payment.paymentuzs;
                      }, 0) -
                      saleconnector.discounts.reduce((summ, discount) => {
                        return summ + discount.discountuzs;
                      }, 0)
                    ).toLocaleString('de-DE')}
                  </span>
                  {'  '}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
