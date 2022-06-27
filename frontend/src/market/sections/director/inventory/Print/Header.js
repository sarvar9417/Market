import { t } from 'i18next';
import React from 'react';

export const Header = ({ auth, inventoriesConnector }) => {
  return (
    <div className='grid grid-cols-3 items-center'>
      <div className='flex flex-col'>
        <p className=''>
          <span className='font-bold'>{t('Sana')}:</span>{' '}
          <span>
            {new Date(inventoriesConnector.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div>
        <div className='text-center text-xl font-bold'>
          {t("Inventarizatsiya")}: {inventoriesConnector.id}
        </div>
      </div>
      <div className='text-right text-2xl font-bold '>PIPE HOUSE</div>
    </div>
  );
};
