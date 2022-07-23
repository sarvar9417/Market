import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, { useState } from 'react';

export const InputProduct = ({
  setCounts,
  product,
  changeEnter,
  loading,
  currency,
}) => {
  console.log(product);
  const [incomingprice, setIncomingprice] = useState(false);
  const changeincomingPrice = () => {
    setIncomingprice(!incomingprice);
  };
  return (
    <div>
      <p className='font-bold flex justify-between'>
        <span className='text-black'>{t('Mahsulot')}:</span>
        <span>
          {product && product.product.code + '-' + product.product.name}{' '}
        </span>
      </p>
      <table className='table m-0'>
        <thead>
          <tr>
            <th className='border text-base p-0 font-bold'>{t('Soni')}</th>
            <th className='border text-base p-0 font-bold'>{t('Narxi')}</th>
            <th className='border text-base p-0 font-bold'>{t('Jami')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border text-base p-0 font-bold px-2 w-1/3'>
              <input
                onKeyUp={changeEnter}
                type='number'
                onChange={setCounts}
                loading={loading}
                name='pieces'
                value={product ? product.pieces : ''}
                className='w-full outline-none text-right font-bold'
              />
            </td>
            <td className='border text-base p-0 font-bold px-2 w-1/3'>
              <input
                onKeyUp={changeEnter}
                type='number'
                onChange={setCounts}
                loading={loading}
                name='unitprice'
                value={
                  product
                    ? currency === 'UZS'
                      ? product.unitpriceuzs
                      : product.unitprice
                    : ''
                }
                className='w-full outline-none text-right font-bold'
              />
            </td>
            <td className='border text-base p-0 font-bold px-2 w-1/3'>
              {product &&
                (currency === 'UZS'
                  ? (Math.round(product.totalpriceuzs * 1) / 1).toLocaleString(
                      'ru-RU'
                    )
                  : Math.round(product.totalprice * 1000) / 1000
                ).toLocaleString('ru-RU')}{' '}
              {currency}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className='text-left py-0'>
              {incomingprice ? (
                <FontAwesomeIcon icon={faEye} onClick={changeincomingPrice} />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={changeincomingPrice}
                />
              )}
            </td>
            <td className='text-base font-bold text-right py-0'>
              {incomingprice &&
                product.product &&
                product.product.price &&
                (currency === 'UZS'
                  ? product.product.price.incomingpriceuzs.toLocaleString(
                      'ru-RU'
                    )
                  : product.product.price.incomingprice.toLocaleString(
                      'ru-RU'
                    ))}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
