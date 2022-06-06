import React from 'react';
import { Datapicker } from './components/Datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { t } from 'i18next';

const animatedComponents = makeAnimated();

export const ReportIncomings = ({
  getImports,
  getIncomingConnectors,
  dailyConnectors,
  suppliers,
  // totalproducts,
  totalprice,
  totalproducttypes,
  sortSuppliers,
}) => {
  return (
    <div className='w-full shadow-lg'>
      <div className='card-header text-lg'>Qabul qilingan mahsulotlar</div>
      <div className='grid grid-cols-12 p-3 grid-rows-6'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 row-span-6'>
          <div className=' xsm:text-center sm:text-start'>
            <Datapicker getIncomingConnectors={getIncomingConnectors} />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
          <Select
            id='select'
            placeholder={t('Yetkazib beruvchilar')}
            isClearable={true}
            components={animatedComponents}
            options={suppliers}
            onChange={sortSuppliers}
          />
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          <span>{t('Mahsulotlar turlari:')}</span>{' '}
          <span className='text-blue-900'>{totalproducttypes}</span>
        </div>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 font-bold flex justify-between text-center px-3 text-base pt-1 mx-3'>
          {t('Jami')}:{' '}
          <span className='text-blue-900'>
            {Math.round(totalprice * 100) / 100} USD
          </span>
        </div>
        <div className='col-span-12 lg:col-span-9 grid grid-cols-12 row-span-5'>
          {dailyConnectors.map((connector, index) => {
            return (
              <div
                key={index}
                className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 m-2'>
                <button
                  onClick={() => getImports(connector.day)}
                  className='bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100'>
                  <p className='font-bold  text-right  flex justify-between'>
                    <span className='font-bold text-orange-700'>
                      {/* {connector.suppliers && connector.suppliers} */}
                    </span>
                    <span className='text-amber-100'>
                      {new Date(connector.day).toLocaleDateString()}
                    </span>
                  </p>
                  <p className='font-bold  flex justify-around text-2xl py-1'>
                    <span className='text-amber-100'>
                      {connector.total &&
                        Math.round(connector.total * 100) / 100}{' '}
                      USD
                    </span>
                  </p>
                  <p className='font-bold text-sm flex justify-between'>
                    <span className='text-orange-400 font-bold'>
                      {connector.suppliers && connector.suppliers}
                      {/* {connector.producttypes} */}
                    </span>
                    <span className='text-orange-400 font-bold'>
                      {/* {connector.products && connector.products} */}
                      {connector.producttypes}
                    </span>
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
