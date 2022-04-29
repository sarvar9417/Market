const {Router} = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

router.post('/offline/payment', auth, (req, res) => {
    require('./offlinepayment.route').payment(req, res)
})

router.post('/offline/getall', auth, (req, res) => {
    require('./offlinepayment.route').getAll(req, res)
})

router.post('/offline/discounts', auth, (req, res) => {
    require('./discount.route').offline(req, res)
})

router.post('/offline/debts', auth, (req, res) => {
    require('./debts.route').offline(req, res)
})

router.post('/statsionar/getall', auth, (req, res) => {
    require('./statsionarpayment.route').getAll(req, res)
})

router.post('/statsionar/payment', auth, (req, res) => {
    require('./statsionarpayment.route').payment(req, res)
})

router.post('/statsionar/prepayment', auth, (req, res) => {
    console.log("Salom")

    require('./statsionarpayment.route').prepayment(req, res)
})

router.post('/statsionar/updateservices', auth, (req, res) => {
    require('./statsionarpayment.route').updateservices(req, res)
})

router.post('/statsionar/discounts', auth, (req, res) => {
    require('./discount.route').statsionar(req, res)
})

router.post('/statsionar/debts', auth, (req, res) => {
    require('./debts.route').statsionar(req, res)
})

module.exports = router
