const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')
//========================================================
// EXCHANGERATE
// CRUD

router.post('/register', auth, (req, res) => {
  require('./exchangerate').register(req, res)
})

router.put('/update', auth, (req, res) => {
  require('./exchangerate').update(req, res)
})

router.delete('/delete', auth, (req, res) => {
  require('./exchangerate').delete(req, res)
})

router.post('/getall', auth, (req, res) => {
  require('./exchangerate').getAll(req, res)
})

module.exports = router
