import { t } from 'i18next';
import React from 'react';
import { Director } from './sections/director/Director';
import { Filial } from './sections/filial/Filial';
import { Sale } from './sections/sale/Sale';

export const Counter = ({ section }) => {
  switch (section) {
    case 'Director':
      return <Director />;
    case 'Filial':
      return <Filial />;
    case 'Seller':
      return <Sale />;
    default:
      return <h1>{t('Topilmadi')}</h1>;
  }
};
