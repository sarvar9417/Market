const express = require('express')
module.exports.routers = (app) => {
  app.use(express.json({ extended: true }))
  app.use(express.urlencoded({ extended: true }))
  app.use(
    '/api',
    require('./market_and_director_and_user/market_and_director_and_user'),
  )
  app.use('/api/upload', require('./uploadFiles/upload'))
  //   app.use('/api/sections', require('./sectionAndBaseUrl/getSections'))
  app.use('/api/baseurl', require('./sectionAndBaseUrl/getBaseUrl'))
  app.use('/api/products', require('./products/category_products'))
  app.use('/api/supplier', require('./supplier/supplier.route'))
  app.use('/api/exchangerate', require('./exchangerate/exchangerate.route'))
}
