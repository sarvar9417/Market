import React from 'react';

export const ReportSuppliers = ({ suppliersConnector, changeSupplier }) => {
  return (
    <>
      {suppliersConnector.map((connector, index) => {
        return (
          <div
            onClick={() => changeSupplier(connector._id)}
            key={index}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 m-2'
          >
            <button className='bg-[#216BA5] font-bold rounded text-white text-left py-2 px-3 inline-block w-100'>
              <p className='font-bold  text-right  flex justify-between'>
                <span className='font-bold text-orange-700'>
                  {/* {connector.suppliers && connector.suppliers} */}
                </span>
                <span className='text-amber-100'>
                  {new Date(connector.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p className='font-bold  flex justify-around text-2xl py-1'>
                <span className='text-amber-100'>
                  {connector.supplier && connector.supplier}
                </span>
              </p>
              <p className='font-bold text-sm flex justify-between'>
                <span className='text-orange-400 font-bold'>
                  {connector.pieces && connector.pieces}
                  {/* {connector.producttypes} */}
                </span>
                <span className='text-orange-400 font-bold'>
                  {/* {connector.products && connector.products} */}
                  {connector.incomings}
                </span>
              </p>
            </button>
          </div>
        );
      })}
    </>
  );
};
