import { t } from 'i18next';
import React, { useState } from 'react';
import { AddClient } from './Selling/AddClient';
import { Table } from './Selling/Table';
import { Footer } from './Selling/Footer';

export const Selling = ({
  saveTemporary,
  saleconnectorid,
  totalpriceuzs,
  payment,
  debt,
  discount,
  totalprice,
  setVisible,
  editProducts,
  saleproducts,
  packmans,
  client,
  clients,
  changePackman,
  changeClient,
  inputClient,
}) => {
  const [btn, setBtn] = useState(true);
  return (
    <div className='shadow-xl mb-3'>
      <p className='card-header'>{t('Sotilayotgan mahsulotlar')} </p>
      {saleconnectorid ? (
        ''
      ) : (
        <AddClient
          client={client}
          setBtn={setBtn}
          btn={btn}
          changePackman={changePackman}
          packmans={packmans}
          changeClient={changeClient}
          clients={clients}
          inputClient={inputClient}
        />
      )}

      <div className='px-3 py-2 overflow-x-auto'>
        <Table saleproducts={saleproducts} editProducts={editProducts} />
        <Footer
          saveTemporary={saveTemporary}
          totalpriceuzs={totalpriceuzs}
          totalprice={totalprice}
          discount={discount}
          debt={debt}
          payment={payment}
          setVisible={setVisible}
        />
      </div>
    </div>
  );
};
