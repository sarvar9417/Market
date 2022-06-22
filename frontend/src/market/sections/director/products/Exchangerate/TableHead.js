import { t } from 'i18next';
import React from 'react';
import { Sort } from '../Product/Sort';

export const TableHead = ({ currentExchangerate, setCurrentExchangerate }) => {
  return (
    <>
      <ul className='thead shadow-xl'>
        <li className='th border-r'>№</li>
        <li className='th border-r col-span-3 flex justify-center'>
          {t('Sana')}
          <Sort
            property={'createdAt'}
            data={currentExchangerate}
            setData={setCurrentExchangerate}
          />
        </li>
        <li className='th border-r col-span-4 flex justify-center'>
          {t('Kurs')}
          <Sort
            property={'exchangerate'}
            data={currentExchangerate}
            setData={setCurrentExchangerate}
          />
        </li>
        <li className='th col-span-2 border-r'>{t('Tahrirlash')}</li>
        <li className='th col-span-2'>{t("O'chirish")}</li>
      </ul>
    </>
  );
};
