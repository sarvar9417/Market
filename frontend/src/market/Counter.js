import React from "react";
import { Director } from "./sections/director/Director";
import { Filial } from "./sections/filial/Filial";

export const Counter = ({ section }) => {
  switch (section) {
    case "Director":
      return <Director />;
    case "Filial":
      return <Filial />;
    default:
      return <h1>Topilmadi</h1>;
  }
};
