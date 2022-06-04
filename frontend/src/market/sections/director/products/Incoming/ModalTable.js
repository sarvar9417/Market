import { t } from 'i18next';
import React from 'react';

export const ModalTable = ({ incoming, inputHandler }) => {
  return (
    <>
      <div className='font-bold text-black mb-1'>
        {incoming &&
          incoming.category &&
          incoming.category.code + ' ' + incoming.product.name}
      </div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th className='border p-1'>{t('Soni')}</th>
              <th className='border p-1'>{t('Narx')}</th>
              <th className='border p-1'>{t('Umumiy narx')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border m-0 px-3 py-2 font-bold text-center'>
                <input
                  onChange={inputHandler}
                  value={incoming.pieces}
                  type='number'
                  step={0.001}
                  className='outline-none text-right text-black font-bold'
                  name='pieces'
                  style={{ maxWidth: '100px' }}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bolds text-center'>
                <input
                  onChange={inputHandler}
                  value={incoming.unitprice}
                  type='number'
                  className='outline-none text-right text-black font-bold'
                  name='unitprice'
                  style={{ maxWidth: '100px' }}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bold text-center'>
                <input
                  onChange={inputHandler}
                  value={incoming ? incoming.totalprice : 0}
                  type='number'
                  style={{ maxWidth: '100px' }}
                  className='outline-none text-right w-full font-bold text-black'
                  name='totalprice'
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div className="">
                <button
                  onClick={addIncoming}
                  className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-500"
                >
                  +
                </button>
              </div> */}
      </div>
    </>
  );
};
