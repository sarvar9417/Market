import { t } from "i18next";
import React, { useState } from "react";
import { AddClient } from "./Selling/AddClient";
import { Table } from "./Selling/Table";
import { Footer } from "./Selling/Footer";

export const Selling = ({
  checkNumber,
  payment,
  debt,
  discount,
  totalprice,
  setVisible,
  editProducts,
  saleproducts,
  packmans,
  clients,
  changePackman,
  changeClient,
  inputClient,
}) => {
  const [btn, setBtn] = useState(true);
  return (
    <div className='shadow-xl mb-3'>
      <p className='card-header'>
        {t("CHEK")}: № A{1000001 + checkNumber.count}
      </p>
      <div className='px-3 py-2'>
        <AddClient
          setBtn={setBtn}
          btn={btn}
          changePackman={changePackman}
          packmans={packmans}
          changeClient={changeClient}
          clients={clients}
          inputClient={inputClient}
        />
        <Table saleproducts={saleproducts} editProducts={editProducts} />
        <Footer
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
