import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import { Sort } from '../../components/Sort';
import { SortDoubleProperty } from '../../components/SortDoubleProperty';

export const TableHead = ({ sales, setSales }) => {
  return (
    <ul className='thead shadow-xl'>
      <li className='th border-r'>№</li>
      <li className='th border-r flex justify-center'>
        {t('ID')}
        <Sort property={'createdAt'} data={sales} setData={setSales} />
      </li>
      <li className='th border-r flex justify-center'>
        {t('Mijoz')}
        <SortDoubleProperty
          innnerProperty={'name'}
          property={'client'}
          data={sales}
          setData={setSales}
        />
      </li>
      <li className='th border-r flex justify-center col-span-2'>
        {t('Jami')}
        <div className='flex flex-col pl-2'>
          <FontAwesomeIcon
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) >
                  b.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0)
                    ? 1
                    : -1
                )
              )
            }
            icon={faAngleUp}
            className='cursor-pointer p-0 m-0'
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            className='cursor-pointer p-0 m-0'
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) <
                  b.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0)
                    ? 1
                    : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center'>
        {t('Chegirma')}
        <div className='flex flex-col pl-2'>
          <FontAwesomeIcon
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.discounts.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0) >
                  b.discounts.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0)
                    ? 1
                    : -1
                )
              )
            }
            icon={faAngleUp}
            className='cursor-pointer p-0 m-0'
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            className='cursor-pointer p-0 m-0'
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.discounts.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0) <
                  b.products.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0)
                    ? 1
                    : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th border-r flex justify-center'>
        {t('Qarz')}
        <div className='flex flex-col pl-2'>
          <FontAwesomeIcon
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) -
                    a.discounts.reduce((summ, discount) => {
                      return summ + discount.discount;
                    }, 0) -
                    a.payments.reduce((summ, payment) => {
                      return summ + payment.payment;
                    }, 0) >
                  b.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) -
                    b.discounts.reduce((summ, discount) => {
                      return summ + discount.discount;
                    }, 0) -
                    b.payments.reduce((summ, payment) => {
                      return summ + payment.payment;
                    }, 0)
                    ? 1
                    : -1
                )
              )
            }
            icon={faAngleUp}
            className='cursor-pointer p-0 m-0'
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            className='cursor-pointer p-0 m-0'
            onClick={() =>
              setSales(
                [...sales].sort((a, b) =>
                  a.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) -
                    a.discounts.reduce((summ, discount) => {
                      return summ + discount.discount;
                    }, 0) -
                    a.payments.reduce((summ, payment) => {
                      return summ + payment.payment;
                    }, 0) <
                  b.products.reduce((summ, product) => {
                    return summ + product.totalprice;
                  }, 0) -
                    b.discounts.reduce((summ, discount) => {
                      return summ + discount.discount;
                    }, 0) -
                    b.payments.reduce((summ, payment) => {
                      return summ + payment.payment;
                    }, 0)
                    ? 1
                    : -1
                )
              )
            }
          />
        </div>
      </li>
      <li className='th col-span-2 border-r'>{t("Izoh")}</li>
      <li className='th  border-r'>{t('Chek')}</li>
      <li className='th  border-r'>{t("Qo'shish")}</li>
      <li className='th  border-r'>{t('Qaytarish')}</li>
    </ul>
  );
};
