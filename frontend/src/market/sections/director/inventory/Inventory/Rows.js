import { t } from 'i18next';
import React from 'react';
import { SaveBtn, SaveBtnLoad } from '../../components/TableButtons';

export const Rows = ({
  currentPage,
  index,
  product,
  countPage,
  countHandler,
  updateInventory,
  keyPressed,
  commitHandler,
  loading,
}) => {
  return (
    <ul
      className={`tr font-bold  ${
        product.inventory && product.inventory.inventorycount
          ? 'bg-[#e8f8dba6]'
          : ''
      }`}>
      <li className='no'>{currentPage * countPage + 1 + index}</li>
      <li className='td border-r font-bold text-right'>
        {product.productdata.code}
      </li>
      <li className='td border-r font-bold col-span-3 flex justify-between'>
        {product.productdata.name}
      </li>
      <li className='td border-r text-right'>
        <span>{(Math.round(product.total * 100) / 100).toLocaleString('ru-RU')}</span>{' '}
      </li>
      <li className='td  border-r text-right '>
        <input
          disabled={loading}
          id='update'
          onKeyUp={(e) => keyPressed(e, product.inventory, index)}
          onChange={countHandler}
          name={index}
          className='text-right font-bold w-full focus:outline-1 outline-green-800 px-1'
          type='number'
          defaultValue={
            product.inventory && product.inventory.inventorycount
              ? product.inventory.inventorycount
              : 0
          }
        />
      </li>
      <li className='td  border-r text-right col-span-2'>
        <span>
          {product.inventory && product.inventory.inventorycount
            ? product.inventory.inventorycount -
                product.inventory.productcount >
              0
              ? '+' +
                (Math.round(
                  (product.inventory.inventorycount -
                    product.inventory.productcount) *
                    100
                ) /
                  100).toLocaleString('ru-RU')
              : (Math.round(
                  (product.inventory.inventorycount -
                    product.inventory.productcount) *
                    100
                ) / 100).toLocaleString('ru-RU')
            : 0}
        </span>
        <span className='text-red-600 w-1/4 inline-block'>
          {product.unit && product.unit.name}
        </span>
      </li>
      <li className='td  border-r text-right col-span-2'>
        <input
          disabled={loading}
          id={index}
          placeholder={t('Izoh')}
          onKeyUp={(e) => keyPressed(e, product.inventory, index)}
          onChange={commitHandler}
          name='comment'
          className='text-right font-bold w-full focus:outline-1 outline-green-800 px-1'
          type='text'
          value={
            product.inventory && product.inventory.comment
              ? product.inventory.comment
              : ''
          }
        />
      </li>
      <li className='td-btn'>
        {loading ? (
          <SaveBtnLoad />
        ) : (
          <SaveBtn
            saveHandler={() => {
              updateInventory(product.inventory, index);
            }}
          />
        )}
      </li>
    </ul>
  );
};
