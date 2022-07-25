import { t } from 'i18next';
import React from 'react';

export const Rows = ({
  currentPage,
  index,
  debt,
  changePrepayment,
  currency,
}) => {
  return (
    <ul className='tr font-bold'>
      <li className='no'>{currentPage * 10 + 1 + index}</li>
      <li className='col-span-2 td border-r font-bold text-right'>
        {new Date(debt.createdAt).toLocaleDateString()}
      </li>
      <li className='td col-span-4 border-r text-left'>
        {debt.client && debt.client.name}
      </li>
      <li className='td  col-span-2  text-right border-r'>{debt.id}</li>
      <li
        onClick={() => changePrepayment(debt.saleconnector)}
        className='td  col-span-3  text-right border-r-2 border-r-orange-600 hover:bg-blue-200 flex justify-between'>
        <span className='text-white'>{t("To'lov")}</span>
        <span>
          {currency === 'UZS'
            ? (Math.round(debt.debtuzs * 1) / 1).toLocaleString('ru-RU')
            : (Math.round(debt.debt * 1000) / 1000).toLocaleString(
                'ru-RU'
              )}{' '}
          <span className='text-orange-600'>{currency}</span>
        </span>
      </li>
    </ul>
  );
};
