import React from 'react';
import { t } from 'i18next';

export const CreateInput = ({ product, keyPressed, inputHandler }) => {
  return (
    <>
      <ul className='tbody'>
        <li className='td text-center bg-white font-bold col-span-3'>
          <input
            name='code'
            value={(product && product.code) || ''}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type='number'
            className='form-control'
            id='price'
            placeholder={t('Mahsulot kodini kiriting')}
          />
        </li>
        <li className='td text-center bg-white font-bold col-span-3'>
          <input
            name='name'
            value={(product && product.name) || ''}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type='text'
            className='form-control'
            id='shortname'
            placeholder={t('Mahsulot nomini kiriting')}
          />
        </li>
        <li className='td text-center bg-white font-bold col-span-3'>
          <input
            name='total'
            value={parseFloat(product && product.total) || ''}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type='number'
            className='form-control'
            id='shortname'
            placeholder={t('Sonini kiriting')}
          />
        </li>
        <li className='td text-center bg-white font-bold col-span-3 flex justify-between'>
          <div className='w-1/2 px-1'>
            <input
              name='incomingprice'
              value={parseFloat(product && product.incomingprice) || ''}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type='number'
              className='form-control'
              id='shortname'
              placeholder='Olish narxi'
            />
          </div>
          <div className='w-1/2 px-1'>
            <input
              name='sellingprice'
              value={parseFloat(product && product.sellingprice) || ''}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type='number'
              className='form-control'
              id='shortname'
              placeholder='Sotish narxi'
            />
          </div>
        </li>
      </ul>
    </>
  );
};
