import Select from 'react-select';
import React from 'react';
import makeAnimated from 'react-select/animated';
import { t } from 'i18next';
const animatedComponents = makeAnimated();

export const CreateSelect = ({
  selectRef,
  categories,
  producttypes,
  brands,
  units,
  changeCategory,
  changeProductType,
  changeBrand,
  changeUnit,
  loading,
}) => {
  return (
    <>
      <ul className='thead'>
        <li className='th col-span-3 border-r'>{t('Kategoriya')}</li>
        <li className='th col-span-3 border-r'>{t('Maxsulot turi')}</li>
        <li className='th col-span-3 border-r'>{t('Brend')}</li>
        <li className='th col-span-3'>{t("O'lchov birligi")}</li>
      </ul>
      <ul className='tbody'>
        <li className='td text-center bg-white font-bold border-r col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.category}
              onChange={(e) => changeCategory(e)}
              components={animatedComponents}
              options={categories}
              isLoading={loading}
              theme={(theme) => ({
                ...theme,
                color: 'black',
                borderRadius: 0,
                padding: 0,
                height: 0,
              })}
            />
          </div>
        </li>
        <li className='td text-center bg-white font-bold border-r col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.producttype}
              isClearable={true}
              isLoading={loading}
              onChange={(e) => changeProductType(e)}
              components={animatedComponents}
              options={producttypes}
              theme={(theme) => ({
                ...theme,
                color: 'black',
                borderRadius: 0,
                padding: 0,
                height: 0,
              })}
            />
          </div>
        </li>
        <li className='td text-center bg-white font-bold border-r col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.brand}
              onChange={(e) => changeBrand(e)}
              components={animatedComponents}
              options={brands}
              isLoading={loading}
              theme={(theme) => ({
                ...theme,
                color: 'black',
                borderRadius: 0,
                padding: 0,
                height: 0,
              })}
            />
          </div>
        </li>
        <li className='td text-center bg-white font-bold border-r col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              isClearable={true}
              ref={selectRef.unit}
              isLoading={loading}
              onChange={(e) => changeUnit(e)}
              components={animatedComponents}
              options={units}
              theme={(theme) => ({
                ...theme,
                color: 'black',
                borderRadius: 0,
                padding: 0,
                height: 0,
              })}
            />
          </div>
        </li>
      </ul>
    </>
  );
};
