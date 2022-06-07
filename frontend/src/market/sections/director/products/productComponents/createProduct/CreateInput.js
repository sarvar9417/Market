import React from 'react';
import { t } from 'i18next';

export const CreateInput = ({ product, keyPressed, inputHandler }) => {
  return (
    <>
      <ul className='tbody'>
        <li className='td text-center bg-white font-bold col-span-3'>
          <input
            name='code'
            value={product.code || ''}
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
            value={product.name || ''}
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
            value={product.total || ''}
            onKeyUp={keyPressed}
            onChange={inputHandler}
            type='number'
            className='form-control'
            id='shortname'
            placeholder={t('Sonini kiriting')}
          />
        </li>
        <li className='td text-center bg-white font-bold col-span-3 flex'>
          <div>
            <input
              name='incomingprice'
              value={product.incomingprice || ''}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type='number'
              className='form-control'
              id='shortname'
              placeholder='Olish narxi'
            />
          </div>
          <div>
            <input
              name='sellingprice'
              value={product.sellingprice || ''}
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
