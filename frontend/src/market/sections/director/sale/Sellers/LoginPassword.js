import React from 'react';
import { Input } from '../../components/Input';

export const LoginPassword = ({ seller, changeHandler, checkData }) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>Login va parol</div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Login:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.login}
            placeholder={'Loginni kiriting'}
            name='login'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Parol:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.password}
            placeholder={'Parolni kiriting'}
            name='password'
            type='password'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Parolni tasdiqlash:</div>{' '}
        <div className='col-span-9'>
          <Input
            type='password'
            changeHandler={changeHandler}
            data={seller.confirmPassword}
            placeholder={'Parolni qayta kiriting'}
            name='confirmPassword'
          />
        </div>
      </div>
      <div className='text-right px-3 mb-2'>
        <button
          onClick={checkData}
          className='bg-green-800 text-white font-bold px-4 py-2 rounded hover:bg-green-700'>
          Saqlash
        </button>
      </div>
    </div>
  );
};
