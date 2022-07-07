import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Product } from './products/Product';
import { Client } from './sale/Client';
import { DebtsReport } from './sale/DebtsReport';
import { Packman } from './sale/Packman';

import { Sale } from './sale/Sale';

export const SaleRouter = () => {
  return (
    <div>
      <Switch>
        {/* Services */}
        <Route path='/alo24' exact>
          <Product />
        </Route>

        <Route path='/alo24/sales'>
          <Sale />
        </Route>

        <Route path='/alo24/client'>
          <Client />
        </Route>
        <Route path='/alo24/packman'>
          <Packman />
        </Route>
        <Route path='/alo24/debts'>
          <DebtsReport />
        </Route>

        <Redirect to='/alo24' />
      </Switch>
    </div>
  );
};
