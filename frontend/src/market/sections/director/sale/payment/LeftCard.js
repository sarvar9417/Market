import React from "react";
import { Number } from "./Number";
import { useState } from "react";

export const LeftCard = () => {
  const [price, setPrice] = useState({
    price: 2470,
  });
  const supPrice = () => {
    setPrice({
      price: price.price + 1,
    });
  };
  return (
    <div className="w-full text-white px-4 lg:w-2/5 md:max-w-[400px] sm:max-w-[400px]  xsm:max-w-[400px] pt-4 m-auto">
      <h1 className=" pb-3 border-[#ddd] text-right text-5xl border-b-2 mb-1">
        {price.price} $
      </h1>
      <p>К оплате: 2 970 $ из 2 970 $</p>
      <div>
        <Number supPrice={supPrice} />
      </div>
      <div className="flex justify-around mt-5">
        <button className="px-7 py-3 bg-[#54B1EC] text-lg">2900 $</button>
        <button className="px-7 py-3 bg-[#54B1EC] text-lg">4400 $</button>
        <button className="px-7 py-3 bg-[#54B1EC] text-lg">5700 $</button>
      </div>
    </div>
  );
};
