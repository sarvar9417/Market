import React from 'react';
import { t } from 'i18next';

export const CreateInput = ({ product, keyPressed, inputHandler }) => {
  return (
    <>
      <ul className='thead'>
        <li className='th col-span-3 border-r'>Maxsulot kodi</li>
        <li className='th col-span-3 border-r'>Maxsulot nomi</li>
        <li className='th col-span-3 border-r'>Maxsulotlar soni</li>
        <li className='th col-span-3 border-r flex'>
          <div className='text-center w-1/2 border-r'>Olish narxi</div>
          <div className='text-center w-1/2 border-r'>Sotish narxi</div>
        </li>
      </ul>
      <ul className='tbody'>
        <li className='td text-center bg-white font-bold border-r col-span-3'>
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
        <li className='td text-center bg-white font-bold border-r col-span-3'>
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
        <li className='td text-center bg-white font-bold border-r col-span-3'>
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
        <li className='td text-center bg-white font-bold border-r col-span-3 flex'>
          <div>
            <input
              name='incomingprice'
              value={product.incomingprice || ''}
              onKeyUp={keyPressed}
              onChange={inputHandler}
              type='number'
              className='form-control'
              id='shortname'
              placeholder='Narxini kiriting'
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
              placeholder='Narxini kiriting'
            />
          </div>
        </li>
      </ul>
    </>
  );
};
