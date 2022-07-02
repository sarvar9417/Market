const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

// Filialar
router.post('/getfilials', auth, (req, res) => {
  require('./filials').getfilials(req, res);
});

// Filialar
router.post('/registerorders', auth, (req, res) => {
  require('./orders').register(req, res);
});

// Filialar
router.post('/getorders', auth, (req, res) => {
  require('./orders').getorders(req, res);
});

module.exports = router;
