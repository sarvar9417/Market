import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

export const Footer = ({ totalprice, discount, debt, payment, setVisible }) => {
  return (
    <div className='flex'>
      <div className='py-3 text-lg w-4/5'>
        <div className='flex justify-between '>
          <span className='text-black font-bold'>{t("Umumiy summa:")}</span>
          <span className='text-black font-bold'>
            {totalprice.toLocaleString("de-DE")} $
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-black font-bold'>{t("Chegirma")}:</span>
          <span className='text-yellow-500 font-bold'>
            {discount.discount.toLocaleString("de-DE")} $
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-black font-bold'>{t("Qarz")}:</span>
          <span className='text-yellow-500 font-bold'>
            {Math.abs(debt.debt).toLocaleString("de-DE")} $
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-black font-bold'>{t("To'lanayotgan")}:</span>
          <span className='text-green-700 font-bold'>
            {(payment.cash + payment.card + payment.transfer).toLocaleString(
              "de-DE"
            )}{" "}
            $
          </span>
        </div>
      </div>
      <button
        onClick={() => setVisible(true)}
        className='w-1/5 my-4 ml-3 bg-blue-800 text-white rounded font-bold text-4xl'>
        <FontAwesomeIcon icon={faMoneyCheckDollar} />
      </button>
    </div>
  );
};
