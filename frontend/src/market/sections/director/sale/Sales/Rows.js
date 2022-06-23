import {
  faAdd,
  faPrint,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
export const Rows = ({
  countPage,
  changePrepayment,
  Clear,
  index,
  saleconnector,
  changeCheck,
  addProducts,
  currentPage,
  editHandler,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no'>{saleconnector.id}</li>
      <li className='td border-r font-bold'>
        {saleconnector.client[0] && saleconnector.client[0].name}
      </li>
      <li
        onClick={() => changePrepayment(saleconnector)}
        className='td font-bold col-span-2 text-right border-r-2 border-r-green-700 hover:bg-blue-200 flex justify-between'
      >
        <span className='text-white'>{t("To'lov")}</span>
        <span>
          {saleconnector.products
            .reduce((summ, product) => {
              return summ + product.totalprice;
            }, 0)
            .toLocaleString('ru-RU')}
          {'  '}
          <span className='text-green-900'>USD</span>
        </span>
      </li>
      <li className='td border-r-2 border-orange-500 font-bold text-right'>
        <span>
          {saleconnector.discounts
            .reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0)
            .toLocaleString('ru-RU')}
        </span>
        {'  '}
      </li>
      <li className='td border-r-2 border-red-600 font-bold text-right'>
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
          ).toLocaleString('ru-RU')}
        </span>
        {'  '}
      </li>
      <li className='td col-span-2 border-r'>
        {saleconnector.payments.map((payment, index) => {
          if (payment.comment) {
            return <p key={index}>{payment.comment}</p>;
          }
          return '';
        })}{' '}
      </li>
      <li className='td-btn border-right'>
        <button
          onClick={() => changeCheck(saleconnector)}
          className='px-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800'
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </li>
      <li className='td-btn border-right'>
        <button
          onClick={() => {
            addProducts(saleconnector);
            Clear();
          }}
          className='px-4 bg-green-700 text-white rounded-xl hover:bg-green-800'
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </li>
      <li className='td-btn'>
        <button
          onClick={() => editHandler(saleconnector)}
          className='px-4 bg-red-600 text-white rounded-xl hover:bg-red-700'
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </li>
    </ul>
  );
};
