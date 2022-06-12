const Router = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

router.post('/chart/getincoming', auth, (req, res) => {
  require('./charts').getIncomingData(req, res);
});

router.post('/chart/getselling', auth, (req, res) => {
  require('./charts').getSellingData(req, res);
});
module.exports = router;
