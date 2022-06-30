import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { InputPayment } from '../PaymentCard/InputPayment';
import ToggleButton from 'react-toggle-button';
import { t } from 'i18next';

export const LeftCardEdit = ({
  editPaymentComment,
  uzs,
  exchangerate,
  checkHandler,
  discount,
  changeProcient,
  payment,
  paymentType,
  changeHandler,
  loading,
}) => {
  const number = [
    7,
    8,
    9,
    4,
    5,
    6,
    1,
    2,
    3,
    ',',
    0,
    <FontAwesomeIcon icon={faArrowLeft} />,
  ];

  const types = [
    { type: "cash", name: t("Naqt") },
    { type: "card", name: t("Plastik") },
    { type: "transfer", name: t("O`tkazma") },
  ];
  const borderRadiusStyle = { borderRadius: 2 };
  return (
    <div className='w-full text-white max-w-[400px] m-auto'>
      <div>
        {paymentType.type === 'mixed' ? (
          types.map((type, index) => {
            return (
              <div
                key={index}
                className='flex text-3xl items-center font-bold border-white border-b-1'>
                <InputPayment
                  uzs={uzs}
                  exchangerate={exchangerate}
                  discount={discount}
                  changeHandler={changeHandler}
                  paymentType={type}
                  payment={payment}
                />
              </div>
            );
          })
        ) : (
          <div className='flex text-3xl items-center font-bold border-white border-b-1'>
            <InputPayment
              uzs={uzs}
              exchangerate={exchangerate}
              discount={discount}
              changeHandler={changeHandler}
              paymentType={paymentType}
              payment={payment}
            />
          </div>
        )}
        {paymentType.type === 'discount' ? (
          <div className='text-base text-right flex justify-end pt-2'>
            <ToggleButton
              thumbStyle={borderRadiusStyle}
              trackStyle={borderRadiusStyle}
              inactiveLabel={'$'}
              activeLabel={'%'}
              value={discount.isProcient}
              onToggle={changeProcient}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='grid grid-cols-3 gap-2 p-4'>
        {number.map((num, index) => {
          return (
            <button
              key={index}
              className='bg-[#54B1EC] text-3xl rounded-full w-[80px] h-[80px] hover:bg-[#54B3FF] m-auto'>
              {num}
            </button>
          );
        })}
      </div>
      <input
        className='w-full mb-2 bg-[#54B1EC] text-white outline-none rounded px-3 py-1 text-base placeholder:text-[#AFD5EF] font-semibold'
        placeholder={t("To'lov uchun izoh")}
        onChange={editPaymentComment}
        loading={loading}
      />
      <button
        onClick={checkHandler}
        className='w-full py-2 bg-[#54B1EC] font-bold text-lg hover:bg-[#54B3FF]'>
        {t("To'lash")}
      </button>
    </div>
  );
};
