const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

router.post('/sales', auth, (req, res) => {
  require('./reports').getSalesReport(req, res);
});

router.post('/product', auth, (req, res) => {
  require('./reports').getProductsReport(req, res);
});

router.post('/incomings', auth, (req, res) => {
  require('./reports').getIncomingsReport(req, res);
});

router.post('/getmarketimg', auth, (req, res) => {
  require('./reports').getMarketImg(req, res);
});

module.exports = router;
