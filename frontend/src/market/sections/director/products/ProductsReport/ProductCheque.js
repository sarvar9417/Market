import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Body } from './ProductCheque/Body';
import { Header } from './ProductCheque/Header';

export const ProductCheque = ({ productCheques, componentRef }) => {
  const auth = useContext(AuthContext);

  return (
    <div className='absolute top-0 w-full bg-white font-mono h-full right-0 z-50 py-4'>
      <div
        className='a4 m-auto w-[27cm] flex justify-between flex-wrap gap-y-4 py-2'
        ref={componentRef}
      >
        {productCheques &&
          productCheques.map((product, pos) => {
            return (
              <div
                className='w-[6cm] inline-block mb-2 mr-2 border-1 border-black'
                key={pos}
              >
                <Header auth={auth} />
                <Body product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
