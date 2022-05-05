import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Advers } from './adver/Advers'
import { EditDirector } from './editDirector/EditDirector'
import { EditDirectorPassword } from './editDirector/EditDirectorPassword'
import { Category } from './services/Categorys'
import { ProductConnectors } from './services/ProductConnector'
import { Products } from './services/Products'
import { Rooms } from './services/Rooms'
import { Services } from './services/Services'
import { ProductType } from './services/ProductType'
import { Warehouses } from './services/Warehouses'
import { Users } from './users/Users'
import { Unit } from './services/Unit'
import { Exchangerate } from './services/Exchangerate'
import { Product } from './services/Product'

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
        <Route path="/alo24/recieptproducts">
          <Warehouses />
        </Route>
        <Route path="/alo24/productconnector">
          <ProductConnectors />
        </Route>

        <Route path="/alo24/exchangerate">
          <Exchangerate />
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
  )
}
