const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

router.post('/getproducts', auth, (req, res) => {
  require('./inventory').getProductsInventory(req, res);
});

router.post('/update', auth, (req, res) => {
  require('./inventory').updateInventory(req, res);
});

router.post('/completed', auth, (req, res) => {
  require('./inventory').completed(req, res);
});

module.exports = router;
