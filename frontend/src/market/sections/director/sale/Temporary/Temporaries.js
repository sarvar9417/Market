import { faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { t } from 'i18next'

export const Temporaries = ({
  temporarys,
  changeTemporary,
  deleteTemporary,
}) => {
  return (
    <div className='shadow-2xl'>
      <div className='card-header text-base'>{t("Vaqtincha saqlanayotganlar")}</div>
      <div className='grid grid-cols-12 gap-1 m-auto'>
        {temporarys.map((temporary, index) => {
          return (
            <div
              key={index}
              className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 py-2 font-bold bg-blue-800  flex flex-col items-center m-2 rounded  transition-all px-3 shadow text-white'>
              <p className='flex justify-between w-full font-bold'>
                <span>{t("Mijoz")}:</span>{' '}
                <span>
                  {temporary.temporary.client &&
                    temporary.temporary.client.name}
                </span>
              </p>
              <p className='flex justify-between w-full font-bold'>
                <span>{t("Mahsulotlar")}:</span>{' '}
                <span>{temporary.temporary.products.length}</span>
              </p>
              <p className='flex justify-between w-full font-bold'>
                <span>{t("Jami")}:</span>{' '}
                <span>
                  {temporary.temporary.products
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
                    onClick={() => changeTemporary(temporary)}
                    className='px-4 py-1 mr-2 bg-green-800 hover:bg-green-700 rounded text-white font-bold text-xs'>
                    <FontAwesomeIcon icon={faPenAlt} />
                  </button>{' '}
                  <button
                    onClick={() => deleteTemporary(temporary)}
                    className='px-4 py-1 bg-red-700 hover:bg-red-600 rounded text-white font-bold text-xs'>
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
