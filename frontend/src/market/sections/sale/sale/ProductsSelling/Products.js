import { t } from 'i18next';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export const Products = ({
  products,
  changeProduct,
  // changeBrand,
  // changeProductType,
  // changeCategory,
  // categories,
  // producttypes,
  // brands,
}) => {
  return (
    <div className='shadow-xl mb-3'>
      <p className='card-header'>{t('Maxsulotlar')}</p>
      <div className='px-3 py-2'>
        <Select
          onChange={changeProduct}
          placeholder={t('Mahsulotlar')}
          components={animatedComponents}
          options={products}
        />
        {/* <Select
          onChange={changeBrand}
          placeholder={t('Brendlar')}
          isClearable={true}
          components={animatedComponents}
          options={brands}
        /> */}
        {/* <Select
            onChange={changeCategory}
            placeholder={t("Kategoriyalar")}
            components={animatedComponents}
            options={categories}
          /> */}
        {/* <Select
          onChange={changeProductType}
          placeholder={t("Mahsulot turlari")}
          isClearable={true}
          components={animatedComponents}
          options={producttypes}
        /> */}
      </div>
    </div>
  );
};
