import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const TableRow = ({
  currency,
  countPage,
  p,
  index,
  currentPage,
  productCheque,
  setProductsChequesCount,
  addProductCheaques,
  chooseProductCheque,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li
        onClick={(e) =>
          chooseProductCheque(
            e,
            index,
            p.category.code + ' ' + p.productdata.code
          )
        }
        data-property='code'
        className={`no text-right px-2 ${
          index === productCheque.index && productCheque.code
            ? 'bg-green-600 text-white'
            : ' '
        }`}
      >
        <span className='w-1/2 pointer-events-none'>{p.productdata.code}</span>
      </li>

      <li
        onClick={(e) => chooseProductCheque(e, index, p.productdata.name)}
        className={`col-span-3 td font-bold border-r ${
          index === productCheque.index && productCheque.name
            ? 'bg-green-600 text-white'
            : ' '
        }`}
        data-property='name'
      >
        {p.productdata.name}
      </li>
      <li
        onClick={(e) => chooseProductCheque(e, index, p.unit.name)}
        className={`col-span-1 td no flex justify-end px-1 ${
          index === productCheque.index && productCheque.unit
            ? 'bg-green-600 text-white'
            : ' '
        }`}
        data-property='unit'
      >
        <span className='pointer-events-none'>
          {p.total.toLocaleString('ru-RU')}
        </span>{' '}
        <span className='ml-1 pointer-events-none'>
          {p.unit && p.unit.name}
        </span>
      </li>
      <li className={`col-span-1 td no flex justify-end px-1`}>
        {p.price &&
          (currency === 'UZS'
            ? p.price.incomingpriceuzs
            : p.price.incomingprice
          ).toLocaleString('ru-RU')}
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {(
          (p.price &&
            (currency === 'UZS'
              ? p.price.incomingpriceuzs
              : p.price.incomingprice)) * p.total
        ).toLocaleString('ru-RU')}{' '}
      </li>
      <li
        onClick={(e) =>
          chooseProductCheque(
            e,
            index,
            p.price[currency === 'UZS' ? 'sellingpriceuzs' : 'sellingprice']
          )
        }
        className={`col-span-1 td no flex justify-end px-1 ${
          index === productCheque.index &&
          (productCheque.sellingprice || productCheque.sellingpriceuzs)
            ? 'bg-green-600 text-white'
            : ' '
        }`}
        data-property={currency === 'UZS' ? 'sellingpriceuzs' : 'sellingprice'}
      >
        {p.price &&
          (currency === 'UZS'
            ? p.price.sellingpriceuzs
            : p.price.sellingprice
          ).toLocaleString('ru-RU')}
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price &&
          (
            (currency === 'UZS'
              ? p.price.sellingpriceuzs
              : p.price.sellingprice) * p.total
          ).toLocaleString('ru-RU')}{' '}
      </li>
      <li className='col-span-1 td-btn no px-4 '>
        <input
          id='checkinput'
          type='number'
          className='max-w-[70%] outline-none text-ms border border-black px-2'
          onChange={(e) => {
            (isNaN(parseFloat(e.target.value)) && setProductsChequesCount(1)) ||
              setProductsChequesCount(parseFloat(e.target.value));
          }}
        />
      </li>
      <li className='col-span-1 td-btn no px-1'>
        <button
          onClick={() => addProductCheaques()}
          className='px-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800'
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </li>
    </ul>
  );
};
