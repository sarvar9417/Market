import React from "react";
import { RightBodyEdit } from "./RightBodyEdit";
import { LeftCardEdit } from "./LeftCardEdit";
import { CardHeader } from "./CardHeader";

export const CardEdit = ({
  totalpriceuzs,
  client,
  exchangerate,
  checkNumber,
  checkHandler,
  discount,
  changeProcient,
  changeHandler,
  paymentType,
  typeHandler,
  totalprice,
  setVisible,
  payment,
  debt,
}) => {
  return (
    <div className='w-screen h-full bg-[#3695D7]  absolute top-0 right-0 overflow-y-scroll z-20 p-3'>
      <CardHeader
        checkNumber={checkNumber}
        client={client}
        totalprice={totalprice}
        totalpriceuzs={totalpriceuzs}
        setVisible={setVisible}
      />
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <LeftCardEdit
          exchangerate={exchangerate}
          checkHandler={checkHandler}
          discount={{ isProcient: true }}
          changeProcient={changeProcient}
          changeHandler={changeHandler}
          paymentType={paymentType}
          totalprice={totalprice}
          payment={payment}
        />
        <RightBodyEdit
          exchangerate={exchangerate}
          typeHandler={typeHandler}
          payment={payment}
          discount={discount}
          debt={debt}
        />
      </div>
    </div>
  );
};
