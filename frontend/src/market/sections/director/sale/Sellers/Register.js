import { t } from 'i18next';
import React from 'react';
import { Input } from '../../components/Input';

export const Register = ({ seller, changeHandler, loading }) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>{t("Sotuvchi ma'lumotlari")}</div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t('Ismi')}:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.firstname}
            placeholder={t('Ismni kiriting')}
            loading={loading}
            classes='text-right'
            name='firstname'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t('Familiyasi')}:</div>
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.lastname}
            placeholder={t('Familiya kiriting')}
            loading={loading}
            classes='text-right'
            name='lastname'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t('Telefon raqami')}:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.phone}
            placeholder={t('Telefon raqamini kiriting')}
            loading={loading}
            type='number'
            classes='text-right'
            name='phone'
          />
        </div>
      </div>
    </div>
  );
};
