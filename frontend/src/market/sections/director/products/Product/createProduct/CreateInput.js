import { t } from 'i18next';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Input } from '../../../components/Input';
const animatedComponents = makeAnimated();

export const CreateInput = ({
  currency,
  product,
  keyPressed,
  inputHandler,
  selectRef,
  units,
  changeUnit,
  loading,
}) => {
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 grid-cols-1 p-2'>
      <div className='flex justify-between font-bold'>
        <p className='font-bold'>{t('Kodi')}:</p>
        <Input
          data={product.code}
          keyPressed={keyPressed}
          changeHandler={inputHandler}
          placeholder={t('Mahsulot kodini kiriting')}
          loading={loading}
          name={'code'}
          type={'text'}
          classes={'text-right'}
        />
      </div>
      <div className='flex justify-between font-bold'>
        <p className='font-bold'>{t('Nomi')}:</p>
        <Input
          data={product.name}
          keyPressed={keyPressed}
          changeHandler={inputHandler}
          loading={loading}
          placeholder={t('Mahsulot nomini kiriting')}
          type={'text'}
          name='name'
        />
      </div>

      <div className='flex justify-between font-bold'>
        <p className='font-bold'>{t('Soni')}:</p>
        <Input
          data={product.total}
          keyPressed={keyPressed}
          changeHandler={inputHandler}
          loading={loading}
          placeholder={t('Sonini kiriting')}
          name={'total'}
          type={'number'}
          classes={'text-right'}
        />
      </div>

      <div className='flex justify-between font-bold'>
        <p className='font-bold'>{t('Keltirilgan narxi')}:</p>
        <Input
          data={
            currency === 'UZS'
              ? product.incomingpriceuzs
              : product.incomingprice
          }
          keyPressed={keyPressed}
          changeHandler={inputHandler}
          loading={loading}
          placeholder={t('Olish narxini kiriting')}
          name={'incomingprice'}
          type={'number'}
          classes={'text-right'}
        />
      </div>

      <div className='flex justify-between font-bold'>
        <p className='font-bold'>{t('Sotish narxi')}:</p>
        <Input
          data={
            currency === 'UZS' ? product.sellingpriceuzs : product.sellingprice
          }
          keyPressed={keyPressed}
          changeHandler={inputHandler}
          placeholder={t('Sotish narxini kiriting')}
          loading={loading}
          name={'sellingprice'}
          type={'number'}
          classes={'text-right'}
        />
      </div>
      <div className='flex justify-between font-bold'>
        <p className='font-bold w-50'>{t("O'lchov birligi")}:</p>
        <Select
          className='w-full z-50'
          id='select'
          isClearable={true}
          ref={selectRef.unit}
          isLoading={loading}
          onChange={(e) => changeUnit(e)}
          components={animatedComponents}
          placeholder={t("O'lchov birligi")}
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
    </div>
  );
};
