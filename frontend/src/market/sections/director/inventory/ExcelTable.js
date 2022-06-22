import { t } from 'i18next';
import React from 'react';

export const ExcelTable = ({ datas }) => {
  console.log(datas);
  return (
    <div className='hidden'>
      <table className='table m-0' id='data-excel-table'>
        <thead>
          <tr>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              №
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Sana')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Kodi')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Mahsulot')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Dastlabki')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Sanoq')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Farqi')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Farqi USD')}
            </th>
            <th className='border sticky py-1 bg-slate-200 text-black text-center top-0 px-2 bg-white'>
              {t('Izoh')}
            </th>
          </tr>
        </thead>
        <tbody>
          {datas.map((inventory, index) => {
            return (
              <tr key={index}>
                <td className='font-bold text-center border border-black py-1 px-2'>
                  {index + 1}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {new Date(inventory.createdAt).toLocaleDateString()}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {inventory.productdata.code}
                </td>
                <td className='font-bold border border-black py-1 px-2'>
                  {inventory.productdata.name}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {inventory.productcount}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2'>
                  {inventory.inventorycount}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                  {inventory.inventorycount - inventory.productcount}
                </td>
                <td className='font-bold text-right border border-black py-1 px-2 text-teal-900'>
                  {(
                    (inventory.inventorycount - inventory.productcount) *
                    inventory.price.sellingprice
                  ).toLocaleString('ru-RU')}
                </td>
                <td className='font-bold border-black border py-1 px-2 text-teal-900'>
                  {inventory.comment && inventory.comment}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className='text-base'>
          <tr>
            <th colSpan={4} className='py-1 text-right border'>
              {t('Jami')}:
            </th>
            <th className='text-right text-teal-900 p-1 border'>
              {datas.reduce((summ, inventory) => {
                return summ + inventory.productcount;
              }, 0)}
            </th>
            <th className='text-right text-teal-900 p-1 border'>
              {datas.reduce((summ, inventory) => {
                return summ + inventory.inventorycount;
              }, 0)}
            </th>
            <th className='text-right text-teal-900 p-1 border'>
              {datas.reduce((summ, inventory) => {
                return (
                  summ + (inventory.inventorycount - inventory.productcount)
                );
              }, 0)}
            </th>
            <th className='text-right text-teal-900 p-1 border'>
              {datas
                .reduce((summ, inventory) => {
                  return (
                    summ +
                    (inventory.inventorycount - inventory.productcount) *
                      inventory.price.sellingprice
                  );
                }, 0)
                .toLocaleString('ru-RU')}
            </th>
            <th className='text-right text-teal-900 p-1 border'></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
