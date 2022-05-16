const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

//========================================================
// Products 
router.post('/products/getall', auth, (req, res) => {
    require('./category').register(req, res)
})

module.exports = router
