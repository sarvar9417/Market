import { t } from 'i18next';
import React from 'react';

export const ModalTable = ({ order, inputHandler, keyPressed }) => {
  const changeHandler = (e) => {
    if (e.key === 'Enter') {
      keyPressed();
    }
  };

  return (
    <>
      <div className='font-bold text-black mb-1'>
        {t('Mahsulot')}: {order.productdata && order.productdata.name}
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
                  value={
                    order.orderpieces &&
                    order.orderpieces.toLocaleString('ru-RU')
                  }
                  type='number'
                  className='outline-none text-right text-black font-bold'
                  name='pieces'
                  style={{ maxWidth: '100px' }}
                  onKeyUp={changeHandler}
                />
              </td>
              <td className='border m-0 px-3 py-2 font-bold  text-center text-black'>
                {order.productprice &&
                  order.productprice.incomingprice.toLocaleString('ru-RU')}
              </td>
              <td className='border m-0 px-3 py-2 font-bold text-center text-black'>
                {order.productprice &&
                  (
                    parseFloat(order.orderpieces) *
                    order.productprice.incomingprice
                  ).toLocaleString('ru-RU')}{' '}
                USD
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
