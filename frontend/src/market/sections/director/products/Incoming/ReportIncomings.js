import React from 'react';
import { Datapicker } from './components/Datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { t } from 'i18next';
import { ReportSuppliers } from './ReportSuppliers';

const animatedComponents = makeAnimated();

export const ReportIncomings = ({
  changeIncomingCard,
  setBeginDay,
  setEndDay,
  dailyConnectors,
  suppliers,
  totalprice,
  totalproducttypes,
  sortSuppliers,
  suppliersConnector,
  dailyVisible,
  reportSuppliersVisible,
  changeSupplier,
}) => {
  return (
    <div className='w-full shadow-lg'>
      <div className='card-header text-lg'>
        {t('Qabul qilingan mahsulotlar')}
      </div>
      <div className='grid grid-cols-12 p-3 grid-rows-6'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3 row-span-6'>
          <div className=' xsm:text-center sm:text-start'>
            <Datapicker setBeginDay={setBeginDay} setEndDay={setEndDay} />
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
            {Math.round(totalprice * 10000) / 10000} USD
          </span>
        </div>
        <div
          className={`${
            dailyVisible
              ? 'col-span-12 lg:col-span-9 grid grid-cols-12 row-span-5'
              : 'hidden'
          }`}
        >
          {dailyConnectors.map((connector, index) => {
            return (
              <div
                key={index}
                className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 m-2'
              >
                <button
                  onClick={() => changeIncomingCard(connector.day)}
                  className='bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100'
                >
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
                        Math.round(connector.total * 10000) / 10000}{' '}
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
        <div
          className={`${
            reportSuppliersVisible
              ? 'col-span-12 lg:col-span-9 grid grid-cols-12 row-span-5'
              : 'hidden'
          }`}
        >
          <ReportSuppliers
            suppliersConnector={suppliersConnector}
            changeSupplier={changeSupplier}
          />
        </div>
      </div>
    </div>
  );
};
