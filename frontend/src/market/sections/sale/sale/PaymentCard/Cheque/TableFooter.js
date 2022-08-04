import React from 'react';
import { t } from 'i18next';
export const TableFooter = ({ sales, currency }) => {
  return (
    <table className='table'>
      <tfoot className='text-base'>
        <tr>
          <th colSpan={6} className='py-1'>
            {t('Jami')}:
          </th>
          <th className='text-right text-teal-900 py-1'>
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
            {t("To'langan")}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.payment.payment &&
              (currency === 'UZS'
                ? sales.payment.paymentuzs.toLocaleString('ru-RU')
                : sales.payment.payment.toLocaleString('ru-RU'))}{' '}
            {currency}
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t('Chegirma')}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.discount &&
              sales.discount.discount &&
              (currency === 'UZS'
                ? sales.discount.discountuzs.toLocaleString('ru-RU')
                : sales.discount.discount.toLocaleString('ru-RU'))}{' '}
            {currency}
          </th>
        </tr>
        <tr>
          <th colSpan={6} className='py-1'>
            {t('Qarz')}:
          </th>
          <th className='text-right text-teal-900 py-1'>
            {sales.debt &&
              sales.debt.debt &&
              (currency === 'UZS'
                ? sales.debt.debtuzs.toLocaleString('ru-RU')
                : sales.debt.debt.toLocaleString('ru-RU'))} {' '}
            {currency}
          </th>
        </tr>
      </tfoot>
    </table>
  );
};
