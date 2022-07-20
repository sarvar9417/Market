import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Body } from './ProductCheque/Body';
import { Header } from './ProductCheque/Header';

export const ProductCheque = ({ productCheques, componentRef, currency }) => {
  const auth = useContext(AuthContext);

  return (
    <div className='absolute top-0 w-full bg-white font-mono h-full right-0 z-50 py-4'>
      <div
        className='a4 m-auto w-[27cm] flex flex-wrap gap-6 py-2'
        ref={componentRef}>
        {productCheques &&
          productCheques.map((product, pos) => {
            return (
              <div
                className='w-[6cm] inline-block border-1 border-black'
                key={pos}>
                <Header auth={auth} />
                <Body product={product} currency={currency} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
