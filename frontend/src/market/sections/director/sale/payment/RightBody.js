<<<<<<< HEAD
import React from 'react'

export const RightBody = () => {
  return (
    <div className="bg-[#D8EEF9] p-2 text-[#333] font-semibold text-lg flex rounded m-3 md:w-3/5">
      <div className="w-1/2">
        <div className="p-11 h-[230px] bg-white rounded m-1">
=======
import React from "react";

export const RightBody = ({ showInput }) => {
  return (
    <div className="bg-[#3695D7] text-[#333] mt-2 font-semibold text-lg rounded w-2/4 px-6 grid grid-cols-2 gap-y-6 justify-items-center">
      <button
        className="bg-white rounded col-span-2 w-full h-[150px]"
        name="payment"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
>>>>>>> f3f95a010cdaf3565ec83f09b99236f8dcd58619
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
          />
          <h1 className="mt-5">Оплата наличными</h1>
<<<<<<< HEAD
        </div>
        <div className="p-11 h-[230px] bg-white rounded m-1">
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"
          />
          <h1 className="mt-5">Оплата бонусами</h1>
        </div>
      </div>
      <div className="w-1/2 bg-white  rounded m-1">
        <div className="flex justify-center mb-[100px]">
          <img
            className="w-[110px] pt-[130px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3344/3344907.png"
          />
        </div>

        <h1>Банковская карта</h1>
      </div>
    </div>
  )
}
=======
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[250px] h-[150px] justify-self-start"
        name="card"
        onClick={showInput}
      >
        <div className="" style={{ pointerEvents: "none" }}>
          <img
            className="w-[80px] h-[80px] mb-[20px]"
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3344/3344907.png"
          />
          <h1>Банковская карта</h1>
        </div>
      </button>
      <button className="bg-white rounded col-span-1 w-[250px] h-[150px] justify-self-end">
        <div style={{ pointerEvents: "none" }}>
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"
          />
          <h1 className="mt-5">Оплата бонусами</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[200px] h-[150px]"
        name="discount"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
          />
          <h1 className="mt-5">Скидка</h1>
        </div>
      </button>
      <button
        className="bg-white rounded col-span-1 w-[200px] h-[150px]"
        name="debt"
        onClick={showInput}
      >
        <div style={{ pointerEvents: "none" }}>
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
          />
          <h1 className="mt-5">Долг</h1>
        </div>
      </button>
    </div>
  );
};
>>>>>>> f3f95a010cdaf3565ec83f09b99236f8dcd58619
