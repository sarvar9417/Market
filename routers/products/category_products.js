const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')
//========================================================
// DEPARTMENT
router.post('/category/registerall', auth, (req, res) => {
  require('./category').registerAll(req, res)
})

router.post('/category/register', auth, (req, res) => {
  require('./category').register(req, res)
})

router.post('/category/getall', auth, (req, res) => {
  require('./category').getAll(req, res)
})

router.post('/category/reseption', auth, (req, res) => {
  require('./category').getAllReseption(req, res)
})

router.get('/category', auth, (req, res) => {
  require('./category').get(req, res)
})

router.put('/category', auth, (req, res) => {
  require('./category').update(req, res)
})

router.delete('/category', auth, (req, res) => {
  require('./category').delete(req, res)
})

router.delete('/category/delete', auth, (req, res) => {
  require('./category').delete(req, res)
})

router.delete('/category/deleteall', auth, (req, res) => {
  require('./category').deleteAll(req, res)
})

//========================================================
// SERVICE
router.post('/product/registerall', auth, (req, res) => {
  require('./product').registerAll(req, res)
})

router.post('/product/register', auth, (req, res) => {
  require('./product').register(req, res)
})

router.post('/product/getallcategory', auth, (req, res) => {
  require('./product').getAllcategory(req, res)
})

router.post('/product/getall', auth, (req, res) => {
  require('./product').getAll(req, res)
})

router.put('/product/update', auth, (req, res) => {
  require('./product').update(req, res)
})

router.delete('/product', auth, (req, res) => {
  require('./product').delete(req, res)
})

router.delete('/product/deleteall', auth, (req, res) => {
  require('./product').deleteAll(req, res)
})

router.delete('/product/deleteallcategory', auth, (req, res) => {
  require('./product').deleteAllcategory(req, res)
})

//========================================================
// SERVICETYPE
router.post('/producttype/registerall', auth, (req, res) => {
  require('./producttype').registerAll(req, res)
})

router.post('/producttype/register', auth, (req, res) => {
  require('./producttype').register(req, res)
})

router.post('/producttype/getallcategory', auth, (req, res) => {
  require('./producttype').getAllcategory(req, res)
})

router.post('/producttype/getall', auth, (req, res) => {
  require('./producttype').getAll(req, res)
})

router.put('/producttype/update', auth, (req, res) => {
  require('./producttype').update(req, res)
})

router.delete('/producttype', auth, (req, res) => {
  require('./producttype').delete(req, res)
})

router.delete('/producttype/deleteall', auth, (req, res) => {
  require('./producttype').deleteAll(req, res)
})

router.delete('/producttype/deleteallcategory', auth, (req, res) => {
  require('./producttype').deleteAllcategory(req, res)
})

//========================================================
// ROOMS
router.post('/room/registerall', auth, (req, res) => {
  require('./room').registerAll(req, res)
})

router.post('/room/register', auth, (req, res) => {
  require('./room').register(req, res)
})

router.post('/room/getall', auth, (req, res) => {
  require('./room').getAll(req, res)
})

router.post('/room/notbusy', auth, (req, res) => {
  require('./room').getnotbusy(req, res)
})

router.put('/room/update', auth, (req, res) => {
  require('./room').update(req, res)
})

router.delete('/room', auth, (req, res) => {
  require('./room').delete(req, res)
})

router.delete('/room/deleteall', auth, (req, res) => {
  require('./room').deleteAll(req, res)
})

//========================================================
// PRODUCTS
router.post('/product/registerall', auth, (req, res) => {
  require('./product').registerAll(req, res)
})

router.post('/product/register', auth, (req, res) => {
  require('./product').register(req, res)
})

router.post('/product/getall', auth, (req, res) => {
  require('./product').getAll(req, res)
})

router.post('/product/getallreseption', auth, (req, res) => {
  require('./product').getAllReseption(req, res)
})

router.put('/product/update', auth, (req, res) => {
  require('./product').update(req, res)
})

router.delete('/product', auth, (req, res) => {
  require('./product').delete(req, res)
})

router.delete('/product/deleteall', auth, (req, res) => {
  require('./product').deleteAll(req, res)
})

//========================================================
// WAREHOUSE
router.post('/warehouse/registerall', auth, (req, res) => {
  require('./warehouse').registerAll(req, res)
})

router.post('/warehouse/register', auth, (req, res) => {
  require('./warehouse').register(req, res)
})

router.post('/warehouse/getall', auth, (req, res) => {
  require('./warehouse').getAll(req, res)
})

router.post('/warehouse/getallproduct', auth, (req, res) => {
  require('./warehouse').getAllProduct(req, res)
})

router.put('/warehouse/update', auth, (req, res) => {
  require('./warehouse').update(req, res)
})

router.delete('/warehouse', auth, (req, res) => {
  require('./warehouse').delete(req, res)
})

router.delete('/warehouse/deleteall', auth, (req, res) => {
  require('./warehouse').deleteAll(req, res)
})

router.delete('/warehouse/deleteallproduct', auth, (req, res) => {
  require('./warehouse').deleteAllProduct(req, res)
})

//========================================================
// PRODUCTCONNECTOR
router.post('/productconnector/register', auth, (req, res) => {
  require('./productconnector').register(req, res)
})

router.post('/productconnector/getall', auth, (req, res) => {
  require('./productconnector').getAll(req, res)
})

router.put('/productconnector/update', auth, (req, res) => {
  require('./productconnector').update(req, res)
})

router.delete('/productconnector', auth, (req, res) => {
  require('./productconnector').delete(req, res)
})

router.delete('/productconnector/deleteall', auth, (req, res) => {
  require('./productconnector').deleteAll(req, res)
})

module.exports = router
