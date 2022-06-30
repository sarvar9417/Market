import React from "react";

export const InputPayment = ({
  // exchangerate,
  // discount,
  changeHandler,
  paymentType,
  payment,
  loading
}) => {
  return (
    <div
      className={`flex text-xl items-center font-bold border-white border-b-2`}>
      <div className='flex'>
        <span className='pb-1 opacity-60'>
          {" "}
          UZS
          {/* {discount.isProcient &&
          paymentType.type !== "cash" &&
          paymentType.type !== "card" &&
          paymentType.type !== "transfer" &&
          paymentType.type !== "mixed"
            ? "%"
            :"UZS" */}
        </span>
        <input
          value={payment[paymentType.type + "uzs"]}
          id={paymentType.type + "uzs"}
          name={paymentType.name}
          onChange={changeHandler}
          type='number'
          data-money='UZS'
          disabled={loading}
          data-type={paymentType.type}
          className='bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none px-2'
        />
      </div>
      <div className='flex'>
        <input
          value={payment[paymentType.type]}
          id={paymentType.type}
          name={paymentType.name}
          onChange={changeHandler}
          disabled={loading}
          type='number'
          data-money='USD'
          data-type={paymentType.type}
          className='bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none px-2'
        />
        <span className='pb-1 opacity-60'>
          {" "}
          USD
          {/* {discount.isProcient &&
          paymentType.type !== "cash" &&
          paymentType.type !== "card" &&
          paymentType.type !== "transfer" &&
          paymentType.type !== "mixed"
            ? "%"
            : "USD"} */}
        </span>
      </div>
    </div>
  );
};
