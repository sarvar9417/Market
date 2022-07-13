const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

router.post('/sales', auth, (req, res) => {
  require('./reports').getSalesReport(req, res);
});
router.post('/products', auth, (req, res) => {
  require('./reports').getProductsReport(req, res);
});

router.post('/incomings', auth, (req, res) => {
  require('./reports').getIncomingsReport(req, res);
});

router.post('/getmarketimg', auth, (req, res) => {
  require('./reports').getMarketImg(req, res);
});
router.post('/debtdiscount', auth, (req, res) => {
  require('./reports').getDebtAndDiscountReports(req, res);
});

router.post('/getpayments', auth, (req, res) => {
  require('./paymentsreport').getPayments(req, res);
});

router.post('/getpaymentexcel', auth, (req, res) => {
  require('./paymentsreport').getPaymentsExcel(req, res);
});

router.post('/returnedproduct', auth, (req, res) => {
  require('./returnedproducts').getReturnedProducts(req, res);
});

router.post('/returnedproductsexcel', auth, (req, res) => {
  require('./returnedproducts').getReturnedProductsExcel(req, res);
});

router.post('/profit', auth, (req, res) => {
  require('./reports').getNetProfit(req, res);
});

router.post('/profitdata', auth, (req, res) => {
  require('./profit').getProfitData(req, res);
});

module.exports = router;
