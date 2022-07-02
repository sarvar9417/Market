import React from 'react';

export const Header = ({ auth }) => {
  return (
    <>
      <div className='w-full bg-white flex justify-center items-center py-1 border-b border-black'>
        <span className='text-sm font-bold uppercase text-center'>
          OOO "{auth.market.name}"
        </span>
      </div>
    </>
  );
};
