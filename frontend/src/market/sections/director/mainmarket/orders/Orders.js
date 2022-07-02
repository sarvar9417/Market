import React from 'react';
import { t } from 'i18next';
import { Datapicker } from '../../components/Datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

export const Orders = ({ setBeginDay, setEndDay, ordersList }) => {
  return (
    <div className='w-full shadow-lg'>
      <div className='card-header text-lg'>{t('Buyurtmalar')}</div>
      <div className='grid grid-cols-12 p-3 grid-rows-6'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 row-span-6'>
          <div className='xsm:text-center sm:text-start'>
            <Datapicker setBeginDay={setBeginDay} setEndDay={setEndDay} />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          <span>{t('Mahsulotlar turlari:')}</span>{' '}
          <span className='text-blue-900'>
            {ordersList.reduce((summ, order) => {
              return summ + order.products.length;
            }, 0)}
          </span>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          {t('Jami')}:{' '}
          <span className='text-blue-900'>
            {ordersList.reduce((summ, order) => {
              return summ + order.totalprice;
            }, 0)}
          </span>
        </div>
        <div className='col-span-12 lg:col-span-9 grid grid-cols-12 row-span-5'>
          {ordersList.map((order) => {
            return (
              <div
                key={order._id}
                className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 m-2'>
                <div className='bg-blue-800 p-3 rounded'>
                  <div className='flex justify-between relative mb-2'>
                    <div
                      className={`z-20 w-[25px] h-[25px] ${
                        order.position === 'sending' ||
                        order.position === 'view' ||
                        order.position === 'ready' ||
                        order.position === 'tosend' ||
                        order.position === 'accept'
                          ? 'bg-green-800'
                          : 'bg-orange-800'
                      } flex items-center justify-center text-white rounded-full`}>
                      {order.position === 'sending' ||
                      order.position === 'view' ||
                      order.position === 'ready' ||
                      order.position === 'tosend' ||
                      order.position === 'accept' ? (
                        <FontAwesomeIcon icon={faCheckDouble} />
                      ) : (
                        1
                      )}
                    </div>
                    <div
                      className={`z-20 w-[25px] h-[25px] ${
                        order.position === 'view' ||
                        order.position === 'ready' ||
                        order.position === 'tosend' ||
                        order.position === 'accept'
                          ? 'bg-green-800'
                          : 'bg-orange-800'
                      } flex items-center justify-center text-white rounded-full`}>
                      {order.position === 'view' ||
                      order.position === 'ready' ||
                      order.position === 'tosend' ||
                      order.position === 'accept' ? (
                        <FontAwesomeIcon icon={faCheckDouble} />
                      ) : (
                        2
                      )}
                    </div>
                    <div
                      className={`z-20 w-[25px] h-[25px] ${
                        order.position === 'ready' ||
                        order.position === 'tosend' ||
                        order.position === 'accept'
                          ? 'bg-green-800'
                          : 'bg-orange-800'
                      } flex items-center justify-center text-white rounded-full`}>
                      {order.position === 'ready' ||
                      order.position === 'tosend' ||
                      order.position === 'accept' ? (
                        <FontAwesomeIcon icon={faCheckDouble} />
                      ) : (
                        3
                      )}
                    </div>
                    <div
                      className={`z-20 w-[25px] h-[25px] ${
                        order.position === 'tosend' ||
                        order.position === 'accept'
                          ? 'bg-green-800'
                          : 'bg-orange-800'
                      } flex items-center justify-center text-white rounded-full`}>
                      {order.position === 'tosend' ||
                      order.position === 'accept' ? (
                        <FontAwesomeIcon icon={faCheckDouble} />
                      ) : (
                        4
                      )}
                    </div>
                    <div
                      className={`z-20 w-[25px] h-[25px] ${
                        order.position === 'accept'
                          ? 'bg-green-800'
                          : 'bg-orange-800'
                      } flex items-center justify-center text-white rounded-full`}>
                      {order.position === 'accept' ? (
                        <FontAwesomeIcon icon={faCheckDouble} />
                      ) : (
                        5
                      )}
                    </div>

                    <div className='w-full absolute h-[1px] bg-white top-3 -z-0'></div>
                  </div>
                  <div className='text-white font-bold flex justify-between  mb-2'>
                    <span>Mahsulotlar</span>
                    <span>{order.products.length}</span>
                  </div>
                  <div className='text-white font-bold flex justify-between mb-2'>
                    <span>Jami</span>
                    <span>{order.totalprice} USD</span>
                  </div>
                  <div className='text-white font-bold flex justify-between'>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className='w-[25px] h-[25px] rounded-full bg-orange-500 flex items-center justify-center'>
                      {order.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
