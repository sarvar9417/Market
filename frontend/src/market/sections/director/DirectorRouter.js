import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { EditDirector } from './editDirector/EditDirector';
import { EditDirectorPassword } from './editDirector/EditDirectorPassword';
import { Category } from './products/Categorys';
// import { ProductType } from './products/ProductType';
import { Unit } from './products/Unit';
import { Exchangerate } from './products/Exchangerate';
import { Product } from './products/Product';
import { Incoming } from './products/Incoming';
import { Supplier } from './products/Supplier';
// import { Brand } from './products/Brand';
import { Sale } from './sale/Sale';
import { Packman } from './sale/Packman';
import { Client } from './sale/Client';
import { FilialRegister } from './filials/FilialRegister';
import { Filials } from './filials/Filials';
import { FilialDirector } from './filials/FilialDirector';
import { Discounts } from './sale/Discounts';
import { Payments } from './sale/Payments';
import { Debts } from './sale/Debts';
import { Inventory } from './inventory/Inventory';
import { Inventories } from './inventory/Inventories';
import { HomePage } from './homepage/HomePage';
import { Report } from './cashRegister/Report';

export const DirectorRouter = () => {
  return (
    <div>
      <Switch>
        {/* Services */}
        <Route path='/alo24' exact>
          <HomePage />
        </Route>
        <Route path='/alo24/editdirector'>
          <EditDirector />
        </Route>
        <Route path='/alo24/editdirectorpassword'>
          <EditDirectorPassword />
        </Route>
        <Route path='/alo24/category'>
          <Category />
        </Route>
        {/* <Route path='/alo24/producttypes'>
          <ProductType />
        </Route> */}
        <Route path='/alo24/product'>
          <Product />
        </Route>
        <Route path='/alo24/unit'>
          <Unit />
        </Route>
        <Route path='/alo24/supplier'>
          <Supplier />
        </Route>
        {/* <Route path='/alo24/brand'>
          <Brand />
        </Route> */}
        <Route path='/alo24/exchangerate'>
          <Exchangerate />
        </Route>
        <Route path='/alo24/incoming'>
          <Incoming />
        </Route>
        <Route path='/alo24/branchregister'>
          <FilialRegister />
        </Route>
        <Route path='/alo24/branches'>
          <Filials />
        </Route>
        <Route path='/alo24/branchdirector'>
          <FilialDirector />
        </Route>
        <Route path='/alo24/packman'>
          <Packman />
        </Route>
        <Route path='/alo24/client'>
          <Client />
        </Route>
        <Route path='/alo24/reports'>
          <Report />
        </Route>
        <Route path='/alo24/sales'>
          <Sale />
        </Route>
        <Route path='/alo24/discounts'>
          <Discounts />
        </Route>
        <Route path='/alo24/payments'>
          <Payments />
        </Route>
        <Route path='/alo24/debts'>
          <Debts />
        </Route>
        <Route path='/alo24/inventory'>
          <Inventory />
        </Route>
        <Route path='/alo24/inventories'>
          <Inventories />
        </Route>

        <Redirect to='/alo24' />
      </Switch>
    </div>
  );
};
