import { faPenAlt, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Temporaries = ({
  changeTemporaryCheck,
  temporarys,
  changeTemporary,
  deleteTemporary,
}) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>Vaqtincha saqlanayotganlar</div>
      <div className='grid grid-cols-12 gap-1 m-auto'>
        {temporarys &&
          temporarys &&
          temporarys.map((temporary, index) => {
            return (
              <div
                key={index}
                className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 py-2 font-bold bg-blue-800  flex flex-col items-center m-2 rounded  transition-all px-3 shadow text-white'>
                <p className='flex justify-between w-full font-bold'>
                  <span>Yetkazib beruvchi:</span>{' '}
                  <span>{temporary.temporaryincoming.supplier.name}</span>
                </p>
                <p className='flex justify-between w-full font-bold'>
                  <span>Mahsulotlar:</span>{' '}
                  <span>{temporary.temporaryincoming.incomings.length}</span>
                </p>
                <p className='flex justify-between w-full font-bold'>
                  <span>Jami:</span>{' '}
                  <span>
                    {temporary.temporaryincoming.incomings
                      .reduce((summ, product) => {
                        return summ + product.totalprice;
                      }, 0)
                      .toLocaleString('ru-RU')}{' '}
                    USD
                  </span>
                </p>
                <p className='flex justify-between w-full font-bold'>
                  <span>
                    {new Date(temporary.createdAt).toLocaleTimeString()}
                  </span>{' '}
                  <span>
                    {new Date(temporary.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className='text-right w-full flex justify-between '>
                  <span className='w-[25px] h-[25px] rounded-full bg-orange-600 flex items-center justify-center font-bold text-xs'>
                    {' '}
                    {index + 1}
                  </span>
                  <span>
                    <button
                      onClick={() => {
                        changeTemporaryCheck(temporary);
                      }}
                      className='px-3 py-1 mr-2 bg-blue-700 hover:bg-blue-600 rounded text-white font-bold text-xs'>
                      <FontAwesomeIcon icon={faPrint} />
                    </button>
                    <button
                      onClick={() => changeTemporary(temporary)}
                      className='px-3 py-1 mr-2 bg-green-800 hover:bg-green-700 rounded text-white font-bold text-xs'>
                      <FontAwesomeIcon icon={faPenAlt} />
                    </button>
                    <button
                      onClick={() => deleteTemporary(temporary)}
                      className='px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-white font-bold text-xs'>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </span>
                </p>
              </div>
            );
          })}{' '}
      </div>
    </div>
  );
};
