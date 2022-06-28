import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ControlMarkets } from './Pages/ControlMarkets/ControlMarkets';
import { Homepage } from './Pages/Homepage';
import { RegisterDirector } from './Pages/Register/RegisterDirector';
import { RegisterMarket } from './Pages/Register/RegisterMarket';

export const ManagementRouter = () => {
  return (
    <div>
      <Switch>
        <Route path='/alo24administration' exact>
          <Homepage />
        </Route>
        <Route path='/alo24administration/register'>
          <RegisterMarket />
        </Route>
        <Route path='/alo24administration/registerdirector/:market'>
          <RegisterDirector />
        </Route>
        <Route path='/alo24administration/control/:market'>
          <ControlMarkets />
        </Route>
      </Switch>
    </div>
  );
};
