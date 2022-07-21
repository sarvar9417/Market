import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Body } from './ProductCheque/Body';

export const ProductCheque = ({ productCheques, componentRef, currency }) => {
  const auth = useContext(AuthContext);

  return (
    <div className=''>
      <div className='' ref={componentRef}>
        <div className='w-[40mm] m-0'>
          {productCheques &&
            productCheques.map((product, pos) => {
              setTimeout(()=>{}, 10)
              return (
                <div key={pos} className='w-[40mm] break-after-page'>
                  <div className='w-[75mm] rotate-90 mt-14 -ml-7'>
                    <div className='text-center font-bold text-lg'>
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
