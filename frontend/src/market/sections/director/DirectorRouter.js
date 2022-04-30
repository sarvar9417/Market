import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Advers } from "./adver/Advers";
import { EditDirector } from "./editDirector/EditDirector";
import { EditDirectorPassword } from "./editDirector/EditDirectorPassword";
import { Departments } from "./services/Departments";
import { ProductConnectors } from "./services/ProductConnector";
import { Products } from "./services/Products";
import { Rooms } from "./services/Rooms";
import { Services } from "./services/Services";
import { ServiceType } from "./services/ServiceType";
import { Warehouses } from "./services/Warehouses";
import { Users } from "./users/Users";

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
        <Route path="/alo24/departments">
          <Departments />
        </Route>
        <Route path="/alo24/servicetypes">
          <ServiceType />
        </Route>
        <Route path="/alo24/services">
          <Services />
        </Route>
        <Route path="/alo24/rooms">
          <Rooms />
        </Route>
        <Route path="/alo24/products">
          <Products />
        </Route>
        <Route path="/alo24/recieptproducts">
          <Warehouses />
        </Route>
        <Route path="/alo24/productconnector">
          <ProductConnectors />
        </Route>

        {/* Users */}
        <Route path="/alo24/users">
          <Users />
        </Route>
        <Route path="/alo24/adver">
          <Advers />
        </Route>
        <Redirect to="/alo24" />
      </Switch>
    </div>
  );
};
