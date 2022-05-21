import React from "react";

export const RightBody = () => {
  return (
    <div className="bg-[#D8EEF9] p-2 text-[#333] font-semibold text-lg flex rounded m-3 md:w-3/5 md:flex-row xsm:flex-col">
      <div className="md:w-1/2 xsm:w-full">
        <div className="p-11 md:h-3/6 bg-white rounded m-1 xsm:h-1/3">
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
          />
          <h1 className="mt-5">Оплата наличными</h1>
        </div>
        <div className="p-11 md:h-3/6 bg-white rounded m-1 xsm:h-1/3">
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"
          />
          <h1 className="mt-5">Оплата бонусами</h1>
        </div>
      </div>
      <div className="bg-white rounded p-11 m-1 md:w-1/2 xsm:w-full md:h-full xsm:h-1/3">
        <div className="flex md:justify-center  md:mb-[100px] sm:mb-5 xsm:mb-5">
          <img
            className="md:w-[110px] md:h-[130px] xsm:w-[80px] xsm:h-[100px]  "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3344/3344907.png"
          />
        </div>

        <h1>Банковская карта</h1>
      </div>
    </div>
  );
};
