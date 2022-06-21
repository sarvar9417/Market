import {
  faCreditCard,
  faMoneyBill1,
  faMoneyBillTransfer,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

export const RightBodyEdit = ({ payment, discount, debt, typeHandler }) => {
  return (
    <div className='bg-blue-100 text-[#333] font-semibold text-lg rounded p-2 h-min mt-4'>
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-2'>
          <div className='grid grid-rows-3 gap-2'>
            <button
              onClick={typeHandler}
              className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex justify-between items-center px-3 py-2'
              name={t("Naqt")}
              data-type='cash'>
              <span className='text-4xl pointer-events-none'>
                <FontAwesomeIcon icon={faMoneyBill1} />
              </span>
              <p className='text-3xl font-bold pointer-events-none flex flex-col'>
                <span className='text-black'>
                  {payment.cash.toLocaleString("de-DE")} USD
                </span>
                <span className='text-lg text-right'>
                  {payment.cashuzs.toLocaleString("de-DE")} UZS
                </span>
              </p>
            </button>
            <button
              onClick={typeHandler}
              className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex justify-between items-center px-3 py-3'
              name={t('Plastik')}
              data-type='card'>
              <span className='text-4xl pointer-events-none'>
                <FontAwesomeIcon icon={faCreditCard} />
              </span>
              <p className='text-3xl font-bold pointer-events-none flex flex-col'>
                <span className='text-black'>
                  {payment.card.toLocaleString("de-DE")} USD
                </span>
                <span className='text-lg text-right'>
                  {payment.carduzs.toLocaleString("de-DE")} UZS
                </span>
              </p>
            </button>
            <button
              onClick={typeHandler}
              className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex justify-between items-center px-3 py-3'
              name={t("O'tkazma")}
              data-type='transfer'>
              <span className='text-4xl pointer-events-none'>
                <FontAwesomeIcon icon={faMoneyBillTransfer} />
              </span>
              <p className='text-3xl font-bold pointer-events-none flex flex-col'>
                <span className='text-black'>
                  {payment.transfer.toLocaleString("de-DE")} USD
                </span>
                <span className='text-lg text-right'>
                  {payment.transferuzs.toLocaleString("de-DE")} UZS
                </span>
              </p>
            </button>
          </div>
        </div>
        <div className='grid grid-rows-3'>
          <div className=' row-span-3'>
            <button
              onClick={typeHandler}
              className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex justify-center items-center px-3 py-3 h-full'
              name={t('Aralash')}
              data-type='mixed'>
              <span className='text-2xl pointer-events-none flex flex-col w-[105px] h-[105px] justify-center  border-white border-2 rounded-full p-4'>
                <span className='flex justify-between'>
                  <FontAwesomeIcon icon={faWallet} />
                  <FontAwesomeIcon icon={faCreditCard} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faMoneyBillTransfer} />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 pt-2'>
        <button
          // onClick={typeHandler}
          className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex flex-col justify-between items-center px-3 py-3'
          name='Chegirma'
          data-type='discount'>
          <h1 className=' pointer-events-none text-yellow-600'>
            {t("Chegirma")}
          </h1>
          <p className='text-3xl font-bold pointer-events-none flex flex-col'>
            <span className='text-black'>
              {discount
                .reduce((summ, discount) => {
                  return summ + discount.discount;
                }, 0)
                .toLocaleString("de-DE")}{" "}
              USD
            </span>
            <span className='text-lg'>
              {discount
                .reduce((summ, discount) => {
                  return summ + discount.discountuzs;
                }, 0)
                .toLocaleString("de-DE")}{" "}
              UZS
            </span>
          </p>
        </button>
        <button
          onClick={typeHandler}
          className='bg-blue-700 hover:bg-blue-800 text-white w-full rounded font-bold flex flex-col justify-between items-center px-3 py-3'
          name='Qarz'
          data-type='debt'>
          <h1 className=' pointer-events-none text-yellow-600'>{t("Qarz")}</h1>
          <p className='text-3xl font-bold pointer-events-none flex flex-col'>
            <span className='text-black'>
              {debt.debt.toLocaleString("de-DE")} USD
            </span>
            <span className='text-lg'>
              {debt.debtuzs.toLocaleString("de-DE")} UZS
            </span>
          </p>
        </button>
      </div>
    </div>
  );
};
