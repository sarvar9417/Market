import { t } from 'i18next';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export const Products = ({ products, changeProduct }) => {
  return (
    <div className='shadow-xl mb-3'>
      <p className='card-header text-lg'>{t('Maxsulotlar')}</p>
      <div className='px-3 py-2'>
        <Select
          onChange={changeProduct}
          placeholder={t('Mahsulotlar')}
          components={animatedComponents}
          options={products}
        />
      </div>
    </div>
  );
};
