import React from "react";
import { Director } from "./sections/director/Director";
import { Reseption } from "./sections/reseption/Reseption";
import { Cashier } from "./sections/cashier/Cashier";
import { Doctor } from "./sections/doctor/Doctor";

export const Counter = ({ section }) => {
  switch (section) {
    case "Director":
      return <Director />;
    case "Reseption":
      return <Reseption />;
    case "Cashier":
      return <Cashier />;
    case "Doctor":
      return <Doctor />;
    default:
      return <h1>Topilmadi</h1>;
  }
};
