import { faAdd, faPenAlt, faPrint } from '@fortawesome/free-solid-svg-icons';
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
        {saleconnector.client && saleconnector.client.name}
      </li>
      {/* <li className='td border-r font-bold text-right'>
        {saleconnector.products.length}
      </li> */}
      <li
        onClick={() => changePrepayment(saleconnector)}
        className='td font-bold col-span-2 text-right border-r-2 border-r-green-700 hover:bg-blue-200 flex justify-between'>
        <span className='text-white'>{t("To'lov")}</span>
        <span>
          {saleconnector.products
            .reduce((summ, product) => {
              return summ + product.totalprice;
            }, 0)
            .toLocaleString('de-DE')}
          {'  '}
          <span className='text-green-900'>USD</span>
        </span>
      </li>
      <li className='td border-r-2 border-red-600 font-bold col-span-2 text-right'>
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
        <span className='text-red-600'>USD</span>
      </li>
      <li className='td border-r-2 border-orange-500 font-bold col-span-2 text-right'>
        <span>
          {saleconnector.discounts
            .reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0)
            .toLocaleString('de-DE')}
        </span>
        {'  '}
        <span className='text-orange-600'>USD</span>
      </li>
      <li className='td-btn border-right'>
        <button
          onClick={() => changeCheck(saleconnector)}
          className='px-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800'>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </li>
      <li className='td-btn border-right'>
        <button
          onClick={() => {
            addProducts(saleconnector);
            Clear();
          }}
          className='px-4 bg-green-700 text-white rounded-xl hover:bg-green-800'>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </li>
      <li className='td-btn'>
        <button
          onClick={() => editHandler(saleconnector)}
          className='px-4 bg-red-600 text-white rounded-xl hover:bg-red-700'>
          <FontAwesomeIcon icon={faPenAlt} />
        </button>
      </li>
    </ul>
  );
};