const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

// Filialar
router.post('/getfilials', auth, (req, res) => {
  require('./filials').getfilials(req, res);
});

router.post('/registerorders', auth, (req, res) => {
  require('./orders').register(req, res);
});

router.post('/getorders', auth, (req, res) => {
  require('./orders').getorders(req, res);
});

router.post('/getorderproducts', auth, (req, res) => {
  require('./orders').getorderproducts(req, res);
});

router.post('/getordersmarket', auth, (req, res) => {
  require('./orders').getordersmarket(req, res);
});

router.post('/getorderproductsmarket', auth, (req, res) => {
  require('./orders').getorderproductsmarket(req, res);
});

router.post('/updateorderproductsmarket', auth, (req, res) => {
  require('./orders').updateorderproductsmarket(req, res);
});

router.post('/updateordersconnector', auth, (req, res) => {
  require('./orders').updateordersconnector(req, res);
});

module.exports = router;
