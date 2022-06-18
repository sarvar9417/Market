import React from 'react';
import { LeftCard } from './LeftCard';
import { RightBody } from './RightBody';
import { CardHeader } from './CardHeader';

export const PrePaymentCard = ({
  prePaymentComment,
  prePaymentSaleConnector,
  totalpriceuzs,
  exchangerate,
  checkHandler,
  changeHandler,
  paymentType,
  typeHandler,
  totalprice,
  setVisible,
  payment,
  debt,
}) => {
  return (
    <div className='w-screen h-full bg-[#3695D7] absolute right-0 top-0 overflow-y-scroll z-20 p-3'>
      <CardHeader
        checkNumber={prePaymentSaleConnector.id}
        client={prePaymentSaleConnector.client}
        totalprice={totalprice}
        totalpriceuzs={totalpriceuzs}
        setVisible={setVisible}
      />
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <LeftCard
          prePaymentComment={prePaymentComment}
          exchangerate={exchangerate}
          checkHandler={checkHandler}
          changeHandler={changeHandler}
          paymentType={paymentType}
          totalprice={totalprice}
          payment={payment}
        />
        <RightBody
          exchangerate={exchangerate}
          typeHandler={typeHandler}
          payment={payment}
          debt={debt}
        />
      </div>
    </div>
  );
};
