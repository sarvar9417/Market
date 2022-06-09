import React from 'react';
import { SaveBtn } from '../../components/TableButtons';

export const Rows = ({
  currentPage,
  index,
  product,
  countPage,
  inventory,
  countHandler,
  updateInventory,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='td border-r font-bold text-right'>
        {product.category.code}
      </li>
      <li className='td border-r font-bold col-span-3 flex justify-between'>
        <span className='w-1/4'>{product.code}</span>
        <span className='w-3/4 text-right'>{product.name}</span>
      </li>
      <li className='td text-center col-span-2 border-r'>
        {product.brand && product.brand.name}
      </li>
      <li className='td border-r text-right'>
        <span>
          {inventory && inventory.productcount
            ? inventory.productcount
            : Math.round(product.total * 100) / 100}
        </span>{' '}
      </li>
      <li className='td  border-r text-right '>
        <input
          onChange={countHandler}
          name={index}
          className='text-right font-bold w-full focus:outline-1 outline-green-800 px-1'
          type='number'
          defaultValue={
            inventory && inventory.inventorycount ? inventory.inventorycount : 0
          }
        />
      </li>
      <li className='td  border-r text-right col-span-2'>
        <span>
          {inventory && inventory.inventorycount
            ? Math.round(
                (inventory.productcount - inventory.inventorycount) * 100
              ) / 100
            : 0}
        </span>
        <span className='text-red-600 w-1/4 inline-block'>
          {product.unit && product.unit.name}
        </span>
      </li>
      <li className='td-btn'>
        {
          <SaveBtn
            saveHandler={() => {
              updateInventory(inventory, index);
            }}
          />
        }
      </li>
    </ul>
  );
};
