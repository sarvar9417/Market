import React from 'react';

export const Temporaries = ({ temporarys, changeTemporary }) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>Vaqtincha saqlanayotganlar</div>
      <div className='grid grid-cols-12 gap-1'>
        {temporarys.map((temporary, index) => {
          return (
            <button
              onClick={() => changeTemporary(temporary)}
              key={index}
              className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 py-4 font-bold bg-orange-700 hover:bg-orange-800 flex flex-col items-center m-2 rounded text-white transition-all hover:translate-x-1 hover:translate-y-1 p-3'>
              <span className='text-base'>
                Mijoz:{' '}
                {temporary.temporary.client && temporary.temporary.client.name}
              </span>
              <span className='flex justify-between w-full'>
                <span>{temporary.temporary.products.length}</span>
                <span>
                  {new Date(temporary.createdAt).toLocaleTimeString()}
                </span>
              </span>
            </button>
          );
        })}{' '}
      </div>
    </div>
  );
};
