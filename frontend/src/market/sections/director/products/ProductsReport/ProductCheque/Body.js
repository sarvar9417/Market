import React from 'react';

export const Body = ({ product }) => {
  return (
    <div className='w-full p-1 font-sans bg-white'>
      <div className='text-left text-xs mb-1'>Наименование:</div>
      <div className='flex justify-center mb-1'>
        <p className='text-xs font-bold'>{product.name && product.name}</p>
      </div>
      <div className='flex justify-center text-base font-bold mb-1'>
        {product.code && product.code}
      </div>
      <div className='flex justify-start text-xs text-black font-medium mb-2'>
        <span>Ед: {product.unit && product.unit}</span>
      </div>
      <div className='flex justify-between items-center text-xs text-black font-medium'>
        <div>
          <span>Цена:</span>{' '}
          <span>{product.sellingprice && product.sellingprice} $</span>
        </div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};
