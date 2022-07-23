import {
  faPenAlt,
  faTrash,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';

export const Table = ({ saleproducts, editProducts, currency }) => {
  return (
    <div className=''>
      <table className='bg-white w-full text-base relative min-w-[700px]'>
        <thead className='z-10 border text-center text-base  text-white py-4'>
          <tr>
            <th className='border sticky top-0 bg-blue-800'>№</th>
            <th className='border sticky top-0 bg-blue-800'>{t('Kodi')}</th>
            <th className='border sticky top-0 bg-blue-800'>{t('Nomi')}</th>
            <th className='border sticky top-0 bg-blue-800'>{t('Soni')}</th>
            <th className='border sticky top-0 bg-blue-800'>{t('Narxi')}</th>
            <th className='border sticky top-0 bg-blue-800'>
              <FontAwesomeIcon className='text-base' icon={faPenAlt} />
            </th>
            <th className='border sticky top-0 bg-blue-800'>
              <FontAwesomeIcon className=' text-base' icon={faTrashCan} />
            </th>
          </tr>
        </thead>
        <tbody className='border text-black'>
          {saleproducts.map((product, index) => {
            return (
              <tr key={index}>
                <td className='border font-bold text-black text-center w-1/12'>
                  {index + 1}
                </td>
                <td className='border font-bold text-black text-center w-1/6'>
                  {product.product.productdata.code}
                </td>
                <td className='border font-bold text-black px-1'>
                  {product.product.productdata.name}
                </td>
                <td className='border font-bold text-black text-right px-2 w-14'>
                  {product.pieces.toLocaleString('ru-RU')}
                </td>
                <td className='border font-bold text-black text-right px-2 w-1/6'>
                  {currency === 'UZS'
                    ? product.totalpriceuzs.toLocaleString('ru-RU')
                    : product.totalprice.toLocaleString('ru-RU')}{' '}
                  <span className='text-green-800'>{currency}</span>
                </td>
                <td className='font-bold text-black  px-2 text-center border'>
                  <button
                    className='px-4 bg-green-700 hover:bg-green-800 text-white rounded-xl my-1 text-sm'
                    onClick={() => {
                      editProducts(product, index, 'edit');
                    }}>
                    <FontAwesomeIcon icon={faPenAlt} />
                  </button>
                </td>
                <td className='font-bold text-black  px-2 text-center border'>
                  <button
                    className='px-4 bg-red-600 hover:bg-red-600 text-white rounded-xl my-1 text-sm'
                    onClick={() => {
                      editProducts(product, index, 'delete');
                    }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
