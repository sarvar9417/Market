import { t } from 'i18next';
import React from 'react';

export const TableFooter = ({ sales, currency }) => {
  return (
    <table className='table'>
      <tfoot className='text-base'>
        <tr className=' border-top-4'>
          <th colSpan={6} className='py-1 pt-5'>
            {t('Jami')}:
          </th>
          <th className='text-right text-teal-900 py-1 pt-5'>
            {currency === 'UZS'
              ? sales.products
                  .reduce((summ, product) => {
                    return summ + product.totalpriceuzs;
                  }, 0)
                  .toLocaleString('ru-RU')
              : sales.products
                  .reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0)
                  .toLocaleString('ru-RU')}{' '}
            {currency}
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t('Chegirma')}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {currency === 'UZS'
              ? sales.discounts
                  .reduce((summ, discount) => {
                    return summ + discount.discountuzs;
                  }, 0)
                  .toLocaleString('ru-RU')
              : sales.discounts
                  .reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0)
                  .toLocaleString('ru-RU')}{' '}
            {currency}
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t("To'langan")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {currency === 'UZS'
              ? sales.payments
                  .reduce((summ, payment) => {
                    return summ + payment.paymentuzs;
                  }, 0)
                  .toLocaleString('ru-RU')
              : sales.payments
                  .reduce((summ, payment) => {
                    return summ + payment.payment;
                  }, 0)
                  .toLocaleString('ru-RU')}{' '}
            {currency}
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t('Qarz')}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {currency === 'UZS'
              ? (
                  sales.products.reduce((summ, product) => {
                    return summ + product.totalpriceuzs;
                  }, 0) -
                  sales.payments.reduce((summ, payment) => {
                    return summ + payment.paymentuzs;
                  }, 0) -
                  sales.discounts.reduce((summ, discount) => {
                    return summ + discount.discountuzs;
                  }, 0)
                ).toLocaleString('ru-RU')
              : (
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
            {currency}
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
