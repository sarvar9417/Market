import { t } from 'i18next';
import React from 'react';
import { Input } from '../../components/Input';

export const LoginPassword = ({ seller, changeHandler, checkData }) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>{t("Login va parol")}</div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t("Login")}:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.login}
            placeholder={t('Loginni kiriting')}
            name='login'
            classes='text-right'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t("Parol")}:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.password}
            placeholder={t('Parolni kiriting')}
            name='password'
            type='password'
            classes='text-right'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>{t("Parolni tasdiqlash")}:</div>{' '}
        <div className='col-span-9'>
          <Input
            type='password'
            changeHandler={changeHandler}
            data={seller.confirmPassword}
            name='confirmPassword'
            placeholder={t('Parolni qayta kiriting')}
            classes='text-right'
          />
        </div>
      </div>
      <div className='text-right px-3 mb-2'>
        <button
          onClick={checkData}
          className='bg-green-800 text-white font-bold px-4 py-2 rounded hover:bg-green-700'>
          {t("Saqlash")}
        </button>
      </div>
    </div>
  );
};
