import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Card } from './components/Card';
import { Requests } from './components/Requests';

export const Filials = () => {
  const auth = useContext(AuthContext);

  const { getFilials } = Requests();

  const [filials, setFilials] = useState([]);

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
            return <Card key={filial.market._id} filial={filial} />;
          })}
        </div>
      </div>
    </div>
  );
};
