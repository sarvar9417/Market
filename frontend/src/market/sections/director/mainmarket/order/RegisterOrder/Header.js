import { t } from 'i18next';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export const Header = ({ loading, selectRef, changeProduct, products }) => {
  return (
    <div className='bg-white  mb-3 shadow-xl'>
      <p className='card-header text-xl'>{t('Buyurtma berish')}</p>
      <div className=' p-3'>
        <Select
          id='select'
          placeholder={t('Mahsulotlar')}
          isClearable={true}
          ref={selectRef.product}
          isLoading={loading}
          onChange={changeProduct}
          components={animatedComponents}
          options={products}
        />
      </div>
    </div>
  );
};
