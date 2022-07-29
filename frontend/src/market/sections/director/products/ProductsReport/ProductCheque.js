import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Body } from './ProductCheque/Body';

export const ProductCheque = ({ productCheques, componentRef, currency }) => {
  const auth = useContext(AuthContext);

  return (
    <div className=''>
      <div className='' ref={componentRef}>
        <div className=''>
          {productCheques &&
            productCheques.map((product, pos) => {
              setTimeout(() => {}, 30);
              return (
                <div
                  key={pos}
                  className='w-[40mm] break-after-page font-sans h-[65mm] times'
                >
                  <div className='w-[65mm] rotate-90 mt-20 -ml-0 text-xl'>
                    <div className='text-center font-bold text-2xl'>
                      <span className=''>OOO "{auth.market.name}"</span>
                      <hr className='' />
                    </div>
                    <Body product={product} currency={currency} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
