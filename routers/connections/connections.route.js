const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

// Filialar
router.post('/getfilials', auth, (req, res) => {
  require('./filials').getfilials(req, res);
});

module.exports = router;
