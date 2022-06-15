const express = require('express');
module.exports.routers = (app) => {
  app.use(express.json({ extended: true, limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    '/api',
    require('./market_and_director_and_user/market_and_director_and_user')
  );
  app.use('/api/upload', require('./uploadFiles/upload'));
  app.use('/api/baseurl', require('./sectionAndBaseUrl/getBaseUrl'));
  app.use('/api/products', require('./products/category_products'));
  app.use('/api/supplier', require('./supplier/supplier.route'));
  app.use('/api/exchangerate', require('./exchangerate/exchangerate.route'));
  app.use('/api/sales', require('./sales/packman_client'));
  // filials
  app.use(
    '/api/filialproducts',
    require('./filialproducts/filialproducts.route')
  );
  app.use('/api/inventory', require('./inventory/inventory.routes'));
  app.use('/api/reports', require('./charts/chars.routes'));
  app.use('/api/reports', require('./reports/reports.route'));
};
