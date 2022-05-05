const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')
//========================================================
// SUPPLIER
// CRUD

router.post('/register', auth, (req, res) => {
  require('./supplier').register(req, res)
})

router.put('/update', auth, (req, res) => {
  require('./supplier').update(req, res)
})

router.delete('/delete', auth, (req, res) => {
  require('./supplier').delete(req, res)
})

router.post('/getall', auth, (req, res) => {
  require('./supplier').getAll(req, res)
})

module.exports = router