import React from 'react'

export const RightBody = () => {
  return (
    <div className="bg-[#D8EEF9] p-2 text-[#333] font-semibold text-lg flex rounded m-3 md:w-3/5">
      <div className="w-1/2">
        <div className="p-11 h-[230px] bg-white rounded m-1">
          <img
            className="w-[75px] "
            alt="#"
            src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
          />
          <h1 className="mt-5">Оплата наличными</h1>
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
