import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

export const Footer = ({
  totalpriceuzs,
  totalprice,
  discount,
  payment,
  setVisible,
}) => {
  return (
    <div>
      <div className='grid grid-cols-12 text-lg font-bold p-2 min-w-[700px]'>
        <div className='col-span-6 flex flex-col'>
          <span className='text-black font-bold'>{t("Umumiy summa:")}</span>
          <span className='text-black font-bold'>{t("Chegirma")}:</span>
          <span className='text-black font-bold'>{t("Qarz")}:</span>
          <span className='text-black font-bold'>{t("To'langan")}:</span>
        </div>
        <div className='col-span-2 flex flex-col text-right'>
          <span className=''>
            {totalpriceuzs.toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>UZS</span>
          </span>
          <span className=''>
            {(
              Math.round(
                discount.reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0) * 100
              ) / 100
            ).toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>UZS</span>
          </span>
          <span className=''>
            {(
              Math.round(
                (totalpriceuzs -
                  discount.reduce((summ, discount) => {
                    return summ + discount.discountuzs;
                  }, 0) -
                  payment.reduce((summ, payment) => {
                    return summ + payment.paymentuzs;
                  }, 0)) *
                  100
              ) / 100
            ).toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>UZS</span>
          </span>
          <span className=''>
            {(
              Math.round(
                payment.reduce((summ, payment) => {
                  return summ + payment.paymentuzs;
                }, 0) * 100
              ) / 100
            ).toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>UZS</span>
          </span>
        </div>
        <div className='col-span-2 flex flex-col text-right'>
          <span className=''>
            {totalprice.toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>USD</span>
          </span>
          <span className=''>
            {(
              Math.round(
                discount.reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0) * 10000
              ) / 10000
            ).toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>USD</span>
          </span>
          <span className=''>
            {(
              Math.round(
                (totalprice -
                  discount.reduce((summ, discount) => {
                    return summ + discount.discount;
                  }, 0) -
                  payment.reduce((summ, payment) => {
                    return summ + payment.payment;
                  }, 0)) *
                  10000
              ) / 10000
            ).toLocaleString("ru-RU")}{" "}
            <span className='text-green-800'>USD</span>
          </span>
          <span className=''>
            {(
              Math.round(
                payment.reduce((summ, payment) => {
                  return summ + payment.payment;
                }, 0) * 10000
              ) / 10000
            ).toLocaleString("ru-RU")}{" "}
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
    </div>
  );
};
