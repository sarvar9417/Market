import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { PrintBtnLoad } from '../../../components/TableButtons';

export const Rows = ({
  countPage,
  index,
  saleconnector,
  changeCheck,
  currentPage,
  loading,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no'>{saleconnector.id}</li>
      <li className='td border-r font-bold'>
        {saleconnector.client && saleconnector.client.name}
      </li>
      <li className='td font-bold col-span-2 text-right border-r-2 border-r-green-700  flex justify-end'>
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
      <li className='td border-r-2 border-orange-500 font-bold text-right col-span-2'>
        <span>
          {saleconnector.discounts
            .reduce((summ, discount) => {
              return summ + discount.discount;
            }, 0)
            .toLocaleString('ru-RU')}
        </span>
        {'  '}
        <span className='text-orange-500'>USD</span>
      </li>
      <li className='td border-r-2 border-red-600 font-bold text-right col-span-2'>
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
        <span className='text-red-600'>USD</span>
      </li>
      <li className='td col-span-2 border-r '>
        {saleconnector.payments.map((payment, index) => {
          if (payment.comment) {
            return <p key={index}>{payment.comment}</p>;
          }
          return '';
        })}
      </li>
      <li className='td-btn border-right'>
        {loading ? (
          <PrintBtnLoad />
        ) : (
          <button
            onClick={() => changeCheck(saleconnector)}
            className='px-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800'>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        )}
      </li>
    </ul>
  );
};
