import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Card } from './components/Card';
import { Requests } from './components/Requests';
import { Payments } from './payments/Payments';
import { Products } from './products/Products';
import { Sales } from './sales/Sales';

export const Filials = () => {
  const auth = useContext(AuthContext);

  const [visibleProducts, setVisibleProducts] = useState(false);
  const [visibleSales, setVisibleSales] = useState(false);
  const [visiblePayments, setVisiblePayments] = useState(false);

  const { getFilials } = Requests();

  const [filials, setFilials] = useState([]);
  const [filial, setFilial] = useState();

  const changeProducts = (e) => {
    setFilial(e.target.name);
    setVisibleProducts(true);
    setVisibleSales(false);
    setVisiblePayments(false);
  };

  const changeSales = (e) => {
    setFilial(e.target.name);
    setVisibleSales(true);
    setVisibleProducts(false);
    setVisiblePayments(false);
  };

  const changePayments = (e) => {
    setFilial(e.target.name);
    setVisibleSales(false);
    setVisibleProducts(false);
    setVisiblePayments(true);
  };

  useEffect(() => {
    getFilials(setFilials);
  }, [getFilials, auth]);

  return (
    <div className='p-3'>
      <div className='overflow-hidden rounded'>
        <div className='py-2 bg-blue-800 text-white font-bold text-center text-lg'>
          Filiallar
        </div>
        <div className='p-3 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
          {filials.map((filial) => {
            return (
              <Card
                key={filial.market._id}
                filial={filial}
                changeProducts={changeProducts}
                changeSales={changeSales}
                changePayments={changePayments}
              />
            );
          })}
        </div>
      </div>

      <div className={visibleProducts ? '' : 'hidden'}>
        <Products market={filial} />
      </div>

      <div className={visibleSales ? '' : 'hidden'}>
        <Sales market={filial} />
      </div>
      <div className={visiblePayments ? '' : 'hidden'}>
        <Payments market={filial} />
      </div>
    </div>
  );
};
