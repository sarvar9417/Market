import { t } from 'i18next';
import React from 'react';

export const TableHead = () => {
  return (
    <ul className='thead shadow-xl min-w-[991px]'>
      <li className='th border-r'>№</li>
      <li className='th border-r'>{t('Kodi')}</li>
      <li className='th border-r flex justify-center col-span-3'>
        {t('Nomi')}
      </li>
      <li className='th border-r flex justify-center'>{t('Soni')}</li>
      <li className='th border-r flex justify-center col-span-2'>
        {t('Narxi (1)')}
      </li>
      <li className='th border-r flex justify-center col-span-2'>
        {t('Jami')}
      </li>
      <li className='th border-r'>{t('Tahrirlash')}</li>
      <li className='th'>{t("O'chirish")}</li>
    </ul>
  );
};
