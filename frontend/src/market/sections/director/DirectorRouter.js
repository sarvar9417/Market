import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { EditDirector } from './editDirector/EditDirector';
import { EditDirectorPassword } from './editDirector/EditDirectorPassword';
import { Category } from './products/Categorys';
import { Unit } from './products/Unit';
import { Exchangerate } from './products/Exchangerate';
import { Product } from './products/Product';
import { Incoming } from './products/Incoming';
import { Supplier } from './products/Supplier';
import { Sale } from './sale/Sale';
import { Packman } from './sale/Packman';
import { Client } from './sale/Client';
import { Filials } from './filials/Filials';
import { Discounts } from './sale/Discounts';
import { Payments } from './sale/Payments';
import { Debts } from './sale/Debts';
import { Inventory } from './inventory/Inventory';
import { Inventories } from './inventory/Inventories';
import { HomePage } from './homepage/HomePage';
import { Report } from './cashRegister/Report';
import { Sellers } from './sale/Sellers';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { ProductsReport } from './products/ProductsReport';

export const DirectorRouter = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [permission, setPermission] = useState({
    creates: false,
    incomings: false,
    inventories: false,
    sales: false,
    reporters: false,
    sellers: false,
    calculations: false,
    branches: false,
    mainmarket: false,
  });

  const getPermission = useCallback(async () => {
    try {
      const data = await request(
        `/api/administrator/getpermission`,
        'POST',
        {
          permissionid: auth.market && auth.market.permission,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      if (data) {
        setPermission(data);
      }
    } catch (error) {
      // notify({
      //   title: error,
      //   description: '',
      //   status: 'error',
      // });
    }
  }, [request, auth]);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  return (
    <div>
      <Switch>
        <Route path='/alo24' exact>
          <HomePage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
        <Route path='/alo24/editdirector'>
          <EditDirector />
        </Route>
        <Route path='/alo24/editdirectorpassword'>
          <EditDirectorPassword />
        </Route>
        {permission.creates && (
          <Route path='/alo24/category'>
            <Category />
          </Route>
        )}
        {permission.creates && (
          <Route path='/alo24/product'>
            <Product />
          </Route>
        )}
        {permission.creates && (
          <Route path='/alo24/unit'>
            <Unit />
          </Route>
        )}
        {permission.creates && (
          <Route path='/alo24/supplier'>
            <Supplier />
          </Route>
        )}

        <Route path='/alo24/exchangerate'>
          <Exchangerate />
        </Route>
        {permission.incomings && (
          <Route path='/alo24/incoming'>
            <Incoming />
          </Route>
        )}

        {permission.branches && (
          <Route path='/alo24/branches'>
            <Filials />
          </Route>
        )}

        <Route path='/alo24/packman'>
          <Packman />
        </Route>
        <Route path='/alo24/client'>
          <Client />
        </Route>
        <Route path={'/alo24/productsreport'}>
          <ProductsReport />
        </Route>
        <Route path='/alo24/reports'>
          <Report />
        </Route>
        {permission.sales && (
          <Route path='/alo24/sales'>
            <Sale />
          </Route>
        )}
        {permission.calculations && (
          <Route path='/alo24/discounts'>
            <Discounts />
          </Route>
        )}
        {permission.calculations && (
          <Route path='/alo24/payments'>
            <Payments />
          </Route>
        )}
        {permission.calculations && (
          <Route path='/alo24/debts'>
            <Debts />
          </Route>
        )}
        {permission.inventories && (
          <Route path='/alo24/inventory'>
            <Inventory />
          </Route>
        )}
        {permission.inventories && (
          <Route path='/alo24/inventories'>
            <Inventories />
          </Route>
        )}
        {permission.sellers && (
          <Route path='/alo24/sellers'>
            <Sellers />
          </Route>
        )}

        {/* <Redirect to='/alo24' /> */}
      </Switch>
    </div>
  );
};
