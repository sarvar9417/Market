import React from 'react';

export const Header = ({ auth, sales, client }) => {
  return (
    <div className='grid grid-cols-3 items-center'>
      <div className='flex flex-col'>
        <p className='flex justify-between'>
          <span className='font-bold'>Mijoz:</span>{' '}
          <span>{client && client.name}</span>
        </p>
        {/* <p className='flex justify-between'>
          <span className='font-bold'>Do'kon:</span>{' '}
          <span>{auth.market.name}</span>
        </p> */}
        {/* <p className='flex justify-between'>
          <span className='font-bold'>Telefon:</span>{' '}
          <span>+998 {auth.market.phone1}</span>
        </p> */}
        {/* <p className='flex justify-between'>
          <span className='font-bold'>Manzil:</span>{' '}
          <span>{auth.market.address}</span>
        </p> */}
        <p className='flex justify-between'>
          <span className='font-bold'>Sana:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </p>
      </div>
      <div></div>
      <div className='text-right text-2xl font-bold '>PIPE HOUSE</div>
    </div>
  );
};
