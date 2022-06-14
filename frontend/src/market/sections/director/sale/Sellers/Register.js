import React from 'react';
import { Input } from '../../components/Input';

export const Register = ({ seller, changeHandler }) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>Sotuvchi ma'lumotlari</div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Ismi:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.firstname}
            placeholder={'Ismini kiriting'}
            classes='text-right'
            name='firstname'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Familiyasi:</div>
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.lastname}
            placeholder={'Ismini kiriting'}
            classes='text-right'
            name='lastname'
          />
        </div>
      </div>
      <div className='font-bold grid grid-cols-12 px-3 py-2'>
        <div className='col-span-3'>Telefon raqami:</div>{' '}
        <div className='col-span-9'>
          <Input
            changeHandler={changeHandler}
            data={seller.phone}
            placeholder={'Telefon raqamini kiriting'}
            type='number'
            classes='text-right'
            name='phone'
          />
        </div>
      </div>
    </div>
  );
};
