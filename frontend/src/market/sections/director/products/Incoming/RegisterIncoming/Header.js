import { t } from 'i18next';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export const Header = ({
  loading,
  selectRef,
  setSupplier,
  suppliers,
  // categorys,
  // changeProductType,
  changeProduct,
  // changeCategory,
  // productType,
  products,
}) => {
  const [value, setValue] = useState(false);
  return (
    <div className='bg-white  mb-3 shadow-xl'>
      <p className='card-header text-xl'>{t('Qabul qilish')}</p>
      <div className='grid  grid-cols-1 sm:grid-cols-2 gap-2 p-2'>
        <Select
          id='select'
          placeholder={t('Yetkazib beruvchilar')}
          isClearable={true}
          isLoading={loading}
          ref={selectRef.supplier}
          onChange={(e) => {
            setSupplier(e.supplier);
            if (e.value !== 'all') {
              setValue(true);
            } else setValue(false);
          }}
          components={animatedComponents}
          options={suppliers}
        />
        <Select
          id='select'
          isDisabled={!value}
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
