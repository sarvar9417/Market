import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const TableRow = ({
  countPage,
  p,
  index,
  currentPage,
  productCheque,
  productChequesCount,
  setProductsChequesCount,
  addProductCheaques,
  chooseProductCheque,
  print,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li
        onClick={(e) => chooseProductCheque(e, index, p.productdata.code)}
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
        <span>{p.total}</span>{' '}
        <span className='ml-1 pointer-'>{p.unit && p.unit.name}</span>
      </li>
      <li className={`col-span-1 td no flex justify-end px-1`}>
        {p.price && p.price.incomingprice} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {((p.price && p.price.incomingprice) * p.total).toLocaleString('ru-RU')}{' '}
        USD
      </li>
      <li
        onClick={(e) => chooseProductCheque(e, index, p.price.sellingprice)}
        className={`col-span-1 td no flex justify-end px-1 ${
          index === productCheque.index && productCheque.sellingprice
            ? 'bg-green-600 text-white'
            : ' '
        }`}
        data-property='sellingprice'
      >
        {p.price && p.price.sellingprice} USD
      </li>
      <li className='col-span-1 td no flex justify-end px-1'>
        {p.price && (p.price.sellingprice * p.total).toLocaleString('ru-RU')}{' '}
        USD
      </li>
      <li className='col-span-1 td no flex justify-center px-4 '>
        <input
          type='number'
          onBlur={(e) => (e.target.value = 0)}
          className='max-w-[70%] outline-none text-ms border border-black px-2'
          onChange={(e) => {
            (isNaN(parseFloat(e.target.value)) && setProductsChequesCount(1)) ||
              setProductsChequesCount(parseFloat(e.target.value));
          }}
        />
      </li>
      <li className='col-span-1 td no flex justify-center px-1'>
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
