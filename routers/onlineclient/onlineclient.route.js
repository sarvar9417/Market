const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

router.post('/client/register', auth, (req, res) => {
  require('./clients.route').register(req, res)
})

router.post('/client/add', auth, (req, res) => {
  require('./clients.route').add(req, res)
})

router.post('/client/getall', auth, (req, res) => {
  require('./clients.route').getAll(req, res)
})

router.put('/client/update', auth, (req, res) => {
  require('./clients.route').update(req, res)
})

module.exports = router
