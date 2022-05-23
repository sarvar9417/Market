import React from 'react'

export const InputPayment = ({ paymentType }) => {
  return (
    <div
      className={`flex text-3xl items-center font-bold border-white border-b-2`}
    >
      <span className="text-blue-50 opacity-50 text-xl">
        {paymentType.typeName}
      </span>
      <input
        id={paymentType.type}
        // onChange={changeHandler}
        type="number"
        className="bg-[#3695D7]  text-right font-bold  mb-1  w-full outline-none"
      />
      <span className="pb-1">$</span>
    </div>
  )
}
