import React from "react";

export const Number = ({ supPrice }) => {
  const number = [7, 8, 9, 4, 5, 6, 1, 2, 3, ",", 0, "x"];
  return (
    <div>
      <div className=" my-2 text-center">
        {number.map((num, index) => {
          return (
            <button key={index} onClick={supPrice} className="bg-[#54B1EC] text-3xl rounded-full mr-8 mt-3 w-[80px] h-[80px]">
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
