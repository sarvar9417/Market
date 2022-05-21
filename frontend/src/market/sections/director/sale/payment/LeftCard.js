import React from "react";
import { Number } from "./Number";

export const LeftCard = ({
  totalprice,
  payment,
  inputHandler,
  discount,
  debt,
}) => {
  const number = [7, 8, 9, 4, 5, 6, 1, 2, 3, ",", 0, "x"];
  return (
    <div className="w-full text-white p-3 md:w-2/5 max-w-[400px] pt-4 m-auto">
      <div className="flex text-5xl items-center font-bold border-white border-b-2">
        <input className="bg-[#3695D7]  text-right font-bold  mb-1  w-full" />
        <span className="pb-1">$</span>
      </div>
      <div className="flex text-5xl items-center font-bold border-white border-b-2">
        <input
          className="bg-[#3695D7]  text-right font-bold  mb-1  w-full"
          value={() => {
            if (Object.keys(payment).includes(inputHandler)) {
              return payment[inputHandler];
            }
            if (Object.keys(discount).includes(inputHandler)) {
              return discount[inputHandler];
            }
            if (Object.keys(debt).includes(inputHandler)) {
            }
          }}
        />
        <span className="pb-1">$</span>
      </div>
      <p className="text-base">
        To'lov: {totalprice}$ dan {payment.payment} $
      </p>
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
      <div className="flex justify-around mt-5 ">
        <button className="py-1 w-1/3 bg-[#54B1EC] text-xl flex flex-col justify-center items-center">
          <span className="text-sm">Jami</span>
          <span className="font-bold text-center">{totalprice} $</span>
        </button>
        <button className="mx-2 py-1 w-1/3 bg-[#54B1EC] text-xl flex flex-col justify-center items-center">
          <span className="text-sm">Chegirma</span>
          <span className="font-bold text-center">{totalprice} $</span>
        </button>
        <button className="py-1 w-1/3 bg-[#54B1EC] text-xl flex flex-col justify-center items-center">
          <span className="text-sm">Qarz</span>
          <span className="font-bold text-center">{totalprice} $</span>
        </button>
      </div>
    </div>
  );
};
