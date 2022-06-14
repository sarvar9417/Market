import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Product } from './products/Product';

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

        <Redirect to='/alo24' />
      </Switch>
    </div>
  );
};
