import React from "react";

export const Number = ({ supPrice }) => {
  const number = [7, 8, 9, 4, 5, 6, 1, 2, 3, ",", 0, "x"];
  return (
    <div>
      <div className=" my-2 grid gap-2 grid-cols-3 content-center justify-items-center px-2">
        {number.map((num, index) => {
          return (
            <button
              onClick={supPrice}
              className="bg-[#54B1EC] text-3xl rounded-full lg:w-[80px] lg:h-[80px] sm:w-[70px] sm:h-[70px] xsm:w-[60px] xsm:h-[60px]"
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
