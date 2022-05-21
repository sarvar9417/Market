import React from "react";
import { LeftCard } from "./LeftCard";
import { RightBody } from "./RightBody";
import { RightHeader } from "./RightHeader";

export const Card = () => {
  return (
    <div className="w-screen h-screen bg-[#3695D7] absolute top-0 overflow-y-scroll z-20">
      <div className="flex md:justify-end justify-center py-3">
        <div className="min-w-[768px]">
          <RightHeader />
        </div>
      </div>
      <div className="md:flex md:justify-between">
        <LeftCard />
        <RightBody />
      </div>
    </div>
  );
};
