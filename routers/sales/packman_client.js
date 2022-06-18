const { Router } = require('express');
const router = Router();

// Packman CRUD
router.post('/packman/register', (req, res) => {
  require('./packman').register(req, res);
});

router.post('/packman/getall', (req, res) => {
  require('./packman').getAll(req, res);
});

router.put('/packman/update', (req, res) => {
  require('./packman').updatePackman(req, res);
});

router.delete('/packman/delete', (req, res) => {
  require('./packman').deletePackman(req, res);
});

router.post('/packman/getpackmans', (req, res) => {
  require('./packman').getPackmans(req, res);
});

// Client CRUD
router.post('/client/register', (req, res) => {
  require('./client').register(req, res);
});

router.post('/client/getall', (req, res) => {
  require('./client').getAll(req, res);
});

router.put('/client/update', (req, res) => {
  require('./client').updateClient(req, res);
});

router.delete('/client/delete', (req, res) => {
  require('./client').deleteClient(req, res);
});

router.post('/client/getclients', (req, res) => {
  require('./client').getClients(req, res);
});

// CRUD sale product
router.post('/saleproducts/register', (req, res) => {
  require('./saleproduct').register(req, res);
});

router.post('/saleproducts/registeredit', (req, res) => {
  require('./saleproduct').registeredit(req, res);
});

router.post('/saleproducts/addproducts', (req, res) => {
  require('./saleproduct').addproducts(req, res);
});

router.post('/saleproducts/checknumber', (req, res) => {
  require('./saleproduct').check(req, res);
});

router.post('/saleproducts/getconnectors', (req, res) => {
  require('./saleproduct').getsaleconnectors(req, res);
});

router.post('/saleproducts/getconnectorsexcel', (req, res) => {
  require('./saleproduct').getsaleconnectorsexcel(req, res);
});

router.post('/saleproducts/payment', (req, res) => {
  require('./saleproduct').payment(req, res);
});

// Discounts
router.post('/discounts/get', (req, res) => {
  require('./discount').get(req, res);
});

router.post('/discounts/getexcel', (req, res) => {
  require('./discount').getexcel(req, res);
});

// Payments
router.post('/payments/get', (req, res) => {
  require('./payment').get(req, res);
});

router.post('/payments/getexcel', (req, res) => {
  require('./payment').getexcel(req, res);
});

// Debt
router.post('/debts/get', (req, res) => {
  require('./debt').get(req, res);
});

router.post('/payments/getexcel', (req, res) => {
  require('./payment').getexcel(req, res);
});

//Temporary
router.post('/temporary/register', (req, res) => {
  require('./temporary').register(req, res);
});

router.post('/temporary/get', (req, res) => {
  require('./temporary').getAll(req, res);
});

router.post('/temporary/delete', (req, res) => {
  require('./temporary').deleteTemporary(req, res);
});

module.exports = router;
