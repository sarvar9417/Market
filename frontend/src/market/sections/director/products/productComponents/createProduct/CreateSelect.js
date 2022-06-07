import Select from 'react-select';
import React from 'react';
import makeAnimated from 'react-select/animated';
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
        <li className='th col-span-12'>Mahsulotlar</li>
      </ul>
      <ul className='tbody'>
        <li className='td text-center bg-white font-bold col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.category}
              onChange={(e) => changeCategory(e)}
              components={animatedComponents}
              options={categories}
              placeholder='Kategoriya'
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
        <li className='td text-center bg-white font-bold col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.producttype}
              isClearable={true}
              isLoading={loading}
              onChange={(e) => changeProductType(e)}
              components={animatedComponents}
              options={producttypes}
              placeholder='Mahsulot turi'
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
        <li className='td text-center bg-white font-bold col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              ref={selectRef.brand}
              onChange={(e) => changeBrand(e)}
              components={animatedComponents}
              options={brands}
              placeholder='Brand'
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
        <li className='td text-center bg-white font-bold col-span-3'>
          <div className='p-1'>
            <Select
              id='select'
              isClearable={true}
              ref={selectRef.unit}
              isLoading={loading}
              onChange={(e) => changeUnit(e)}
              components={animatedComponents}
              placeholder="O'lchov birligi"
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
