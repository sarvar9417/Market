import React from 'react';
export const Rows = ({
  countPage,
  index,
  saleconnector,
  currentPage,
  changeCheck,
}) => {
  return (
    <ul className='tr'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='no col-span-1'>{saleconnector.id}</li>
      <li className='td col-span-2 border-r font-bold'>
        {saleconnector.client && saleconnector.client.name}
      </li>
      <li className='td col-span-2 border-r font-bold'>
        {saleconnector.product.productdata.name}
      </li>
      <li className='td font-bold col-span-2 text-right border-r-2 border-r-green-700 flex justify-between'>
        <span>
          {saleconnector.pieces.toLocaleString('ru-RU')}
          {'  '}
          <span className='text-green-900'>USD</span>
        </span>
      </li>
      <li className='td border-r-2 col-span-2 border-orange-500 font-bold text-right'>
        <span>{saleconnector.unitprice.toLocaleString('ru-RU')}</span>
        {'  '}
      </li>
      <li className='td border-r-2 col-span-2 border-red-600 font-bold text-right'>
        <span>{saleconnector.totalprice.toLocaleString('ru-RU')}</span>
        {'  '}
      </li>
    </ul>
  );
};
