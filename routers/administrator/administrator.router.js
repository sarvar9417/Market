const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

// Administrator
router.post('/register', (req, res) => {
  require('./loginRegister').register(req, res);
});

router.post('/login', (req, res) => {
  require('./loginRegister').login(req, res);
});

// Markets
router.post('/getmarkets', (req, res) => {
  require('./markets').getmarkets(req, res);
});

router.post('/getmarketcontrols', (req, res) => {
  require('./markets').getmarketcontrols(req, res);
});

router.post('/updatemarkets', (req, res) => {
  require('./markets').updatemarkets(req, res);
});

module.exports = router;
