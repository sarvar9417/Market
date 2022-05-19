import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { EditDirector } from "./editDirector/EditDirector";
import { EditDirectorPassword } from "./editDirector/EditDirectorPassword";
import { Category } from "./products/Categorys";
import { ProductType } from "./products/ProductType";
import { Unit } from "./products/Unit";
import { Exchangerate } from "./products/Exchangerate";
import { Product } from "./products/Product";
import { Incoming } from "./products/Incoming";
import { Supplier } from "./products/Supplier";
import { Brand } from "./products/Brand";
import { Filials } from "./filials/Filials";
import { Sale } from "./sale/Sale";
import { Packman } from "./sale/Packman";
import { Client } from "./sale/Client";

export const DirectorRouter = () => {
  return (
    <div>
      <Switch>
        {/* Services */}
        <Route path="/alo24" exact>
          <h1> Bosh sahifa</h1>
        </Route>
        <Route path="/alo24/editdirector">
          <EditDirector />
        </Route>
        <Route path="/alo24/editdirectorpassword">
          <EditDirectorPassword />
        </Route>
        <Route path="/alo24/category">
          <Category />
        </Route>
        <Route path="/alo24/producttypes">
          <ProductType />
        </Route>
        <Route path="/alo24/product">
          <Product />
        </Route>
        <Route path="/alo24/unit">
          <Unit />
        </Route>
        <Route path="/alo24/supplier">
          <Supplier />
        </Route>
        <Route path="/alo24/brand">
          <Brand />
        </Route>
        <Route path="/alo24/exchangerate">
          <Exchangerate />
        </Route>
        <Route path="/alo24/incoming">
          <Incoming />
        </Route>
        <Route path="/alo24/filials">
          <Filials />
        </Route>
        <Route path="/alo24/packman">
          <Packman />
        </Route>
        <Route path="/alo24/client">
          <Client />
        </Route>

        <Route path="/alo24/sales">
          <Sale />
        </Route>

        <Redirect to="/alo24" />
      </Switch>
    </div>
  );
};
