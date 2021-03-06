import { t } from 'i18next';
import React from 'react';

export const ModalTable = ({
  currency,
  incoming,
  inputHandler,
  keyPressed,
  loading,
}) => {
  const changeHandler = (e) => {
    if (e.key === 'Enter') {
      keyPressed();
    }
  };
  return (
    <>
      <div className='font-bold text-black mb-1'>
        {t('Mahsulot')}: {incoming.product && incoming.product.name}
      </div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th className='border p-1'>{t('Soni')}</th>
              <th className='border p-1'>{t('Narx')}</th>
              <th className='border p-1'>{t('Umumiy narx')}</th>
              <th className='border p-1'>{t('Avvalgi narxi')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border m-0 px-3 py-2 font-bold text-center'>
                <input
                  onChange={inputHandler}
                  disabled={loading}
                  value={incoming.pieces}
                  type='number'
                  step={0.001}
                  className='outline-none text-right text-black font-bold'
                  name='pieces'
                  style={{ maxWidth: '100px' }}
                  onKeyUp={changeHandler}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bolds text-center'>
                <input
                  onChange={inputHandler}
                  disabled={loading}
                  value={
                    currency === 'UZS'
                      ? incoming.unitpriceuzs
                      : incoming.unitprice
                  }
                  type='number'
                  className='outline-none text-right text-black font-bold'
                  name='unitprice'
                  style={{ maxWidth: '100px' }}
                  onKeyUp={changeHandler}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bold text-center'>
                <input
                  onChange={inputHandler}
                  disabled={loading}
                  value={
                    currency === 'UZS'
                      ? incoming.totalpriceuzs
                      : incoming.totalprice
                  }
                  type='number'
                  style={{ maxWidth: '100px' }}
                  className='outline-none text-right w-full font-bold text-black'
                  name='totalprice'
                  onKeyUp={changeHandler}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bold text-center text-red-600'>
                {incoming.oldprice &&
                  (currency === 'UZS'
                    ? Math.round(incoming.oldpriceuzs * 10000) / 10000
                    : Math.round(incoming.oldprice * 10000) / 10000)}{' '}
                {currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
