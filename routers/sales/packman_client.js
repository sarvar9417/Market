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

router.post('/packman/getconnectors', (req, res) => {
  require('./packman').getPackmanConnectors(req, res);
});

router.post('/packman/getcount', (req, res) => {
  require('./packman').getPackmanCount(req, res);
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

router.post('/client/getconnectors', (req, res) => {
  require('./client').getClientConnectors(req, res);
});

router.post('/client/getcount', (req, res) => {
  require('./client').getClientCount(req, res);
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
module.exports = router;
