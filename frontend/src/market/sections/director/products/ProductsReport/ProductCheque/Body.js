import React from 'react';
// import { useBarcode } from 'next-barcode';

export const Body = ({ product, currency }) => {
  // const { inputRef } = useBarcode({
  //   value: product.code && product.code,
  //   options: {
  //     background: '#fff',
  //     width:'2'
  //   },
  // });
  return (
    <div className=''>
      <div className='text-center text-lg'>
        Наименование:<br/> <span className='font-bold'>{product.name && product.name}</span> 
      </div>
      <div className='text-2xl font-bold text-center'>
        <span>
          {product.sellingprice || product.sellingpriceuzs ? 'Цена:' : ''}
        </span>{' '}
        <span>
          {((product.sellingprice || product.sellingpriceuzs) &&
            (currency === 'UZS'
              ? product.sellingpriceuzs.toLocaleString('ru-RU')
              : product.sellingprice.toLocaleString('ru-RU')) +
              ' ' +
              currency) ||
            ''}
        </span>
      </div>
      <div className='flex justify-center'>
        {/* <svg ref={inputRef} className='h-[23mm] w-[80mm]'  /> */}
      </div>
      <div className='flex justify-between text-xl'>
        <div>Код: {product.code && product.code}</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};
