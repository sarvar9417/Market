import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CashierRouter } from "./CashierRouter";

export const Cashier = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <CashierRouter />
      </Router>
    </div>
  );
};
