import { t } from 'i18next';
import React from 'react';
import { Footer } from './EditSelling/Footer';
import { Table } from './EditSelling/Table';

export const EditSelling = ({
  sellingEditCard,
  changeBack,
  editSaleConnector,
  checkNumber,
  payment,
  discount,
  totalprice,
  totalpriceuzs,
  setVisible,
  saleproducts,
}) => {
  return (
    <div
      className={`bg-white mb-3 shadow-2xl ${sellingEditCard ? '' : 'hidden'}`}
    >
      <p className='bg-blue-800 text-center text-2xl text-white py-2 font-bold'>
        {t('Mahsulotlarni tahrirlash')}
      </p>
      <div className='px-3 py-2'>
        <div className='min-w-[991px]'>
          <Table
            editSaleConnector={editSaleConnector}
            changeBack={changeBack}
            saleproducts={saleproducts}
          />
          <Footer
            totalprice={totalprice}
            totalpriceuzs={totalpriceuzs}
            payment={payment}
            discount={discount}
            setVisible={setVisible}
          />
        </div>
      </div>
    </div>
  );
};
