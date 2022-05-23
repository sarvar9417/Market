import React from "react";
import { Number } from "./Number";

export const LeftCard = ({
  totalprice,
  payment,
  valueName,
  valueProperty,
  discount,
  debt,
  changePay,
  discountedPrice,
}) => {
  const number = [7, 8, 9, 4, 5, 6, 1, 2, 3, ",", 0, "x"];
  return (
    <div className="w-full text-white p-3 md:w-2/5 max-w-[400px] pt-4 m-auto">
      {valueName === "payment" ? (
        <>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={
                (valueProperty === "cash" && payment.cash) ||
                (valueProperty === "card" && payment.card) ||
                (valueProperty === "transfer" && payment.transfer) ||
                0
              }
              onChange={changePay}
              type="number"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">
            {`Naqt to'lov: ${discountedPrice}$ dan ${
              parseInt(payment.payment) || 0
            } $`}
          </p>
        </>
      ) : valueName === "discount" ? (
        <>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={
                valueProperty === "price"
                  ? discount.price
                  : valueProperty === "procient"
                  ? discount.procient
                  : 0
              }
              onChange={changePay}
              type="number"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">
            Chegirma:{" "}
            {valueProperty === "price"
              ? `${discount.price}$`
              : `${discount.procient}%`}
          </p>
        </>
      ) : valueName === "debt" ? (
        <>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={debt.debt || 0}
              disabled
              onChange={changePay}
              type="number"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">Qarz: {debt.debt}</p>
        </>
      ) : valueProperty === "mixed" ? (
        <>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={payment.cash || 0}
              onChange={changePay}
              type="number"
              name="cash"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">Naqt: {payment.cash || 0}</p>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={payment.card || 0}
              onChange={changePay}
              type="number"
              name="card"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">Plastik: {payment.card || 0}</p>
          <div className="flex text-5xl items-center font-bold border-white border-b-2">
            <input
              className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
              value={payment.transfer || 0}
              onChange={changePay}
              type="number"
              name="transfer"
            />
            <span className="pb-1">$</span>
          </div>
          <p className="text-base">O'tkazma: {payment.transfer || 0}</p>
        </>
      ) : (
        ""
      )}
      <div className="grid grid-cols-3 gap-2 p-4">
        {number.map((num, index) => {
          return (
            <button
              key={index}
              className="bg-[#54B1EC] text-3xl rounded-full w-[80px] h-[80px] "
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
