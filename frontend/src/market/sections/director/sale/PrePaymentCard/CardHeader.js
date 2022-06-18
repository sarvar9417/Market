import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';

export const CardHeader = ({
  checkNumber,
  client,
  totalprice,
  totalpriceuzs,
  setVisible,
}) => {
  return (
    <div className='flex md:justify-end justify-center py-3'>
      <div className='sm:min-w-[650px]'>
        <div className='sm:flex justify-evenly items-center text-white m-auto sm:m-0 '>
          <div className='flex'>
            <button className='bg-[#FD9584] font-semibold  text-3xl w-[80px]  h-[80px] rounded-full mr-7'>
              KP
            </button>
            <div>
              <h1 className='font-semibold text-xl  '>{t('Buyurtma')}</h1>
              <p className='text-lg font-semibold flex flex-col  justify-between'>
                <span className='flex justify-between'>
                  {t('Jami')}:{' '}
                  <span>{totalprice.toLocaleString('ru-RU')} USD</span>{' '}
                </span>
                <span className='flex justify-between text-sm'>
                  <span></span>
                  <span>{totalpriceuzs.toLocaleString('ru-RU')} UZS</span>{' '}
                </span>
              </p>
              <p className='font-light'>
                {t('Mijoz')}: {client && client.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className='w-[80px]  h-[80px] border rounded-full text-4xl'>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </div>
    </div>
  );
};
