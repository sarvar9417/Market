import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

export const Footer = ({
  totalprice,
  discount,
  debt,
  payment,
  setVisible,
  totalpriceuzs,
}) => {
  return (
    <div className='grid grid-cols-12 text-lg font-bold p-2 min-w-[700px]'>
      <div className='col-span-6 flex flex-col'>
        <span className='text-black font-bold'>{t("Umumiy summa:")}</span>
        <span className='text-black font-bold'>{t("Chegirma")}:</span>
        <span className='text-black font-bold'>{t("Qarz")}:</span>
        <span className='text-black font-bold'>{t("To'lanayotgan")}:</span>
      </div>
      <div className='col-span-2 flex flex-col text-right'>
        <span className=''>
          {totalpriceuzs.toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>UZS</span>
        </span>
        <span className=''>
          {discount.discountuzs.toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>UZS</span>
        </span>
        <span className=''>
          {parseFloat(debt.debtuzs).toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>UZS</span>
        </span>
        <span className=''>
          {(
            payment.cashuzs +
            payment.carduzs +
            payment.transferuzs
          ).toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>UZS</span>
        </span>
      </div>
      <div className='col-span-2 flex flex-col text-right'>
        <span className=''>
          {totalprice.toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>USD</span>
        </span>
        <span className=''>
          {discount.discount.toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>USD</span>
        </span>
        <span className=''>
          {debt.debt.toLocaleString("de-DE")}{" "}
          <span className='text-green-800'>USD</span>
        </span>
        <span className=''>
          {(payment.cash + payment.card + payment.transfer).toLocaleString(
            "de-DE"
          )}{" "}
          <span className='text-green-800'>USD</span>
        </span>
      </div>
      <div className='font-bold text-4xl col-span-2 text-center py-2 px-3'>
        <button
          onClick={() => setVisible(true)}
          className='w-full h-full  bg-blue-800 text-white rounded '>
          <FontAwesomeIcon icon={faMoneyCheckDollar} />
        </button>
      </div>
    </div>
  );
};
