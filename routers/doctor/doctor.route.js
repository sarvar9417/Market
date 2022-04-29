const {Router} = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')


// Templates
router.post('/template/create', auth, (req, res) => {
    require('./templates').createandupdate(req, res)
})

router.post('/template/getall', auth, (req, res) => {
    require('./templates').getAll(req, res)
})

router.post('/template/createall', auth, (req, res) => {
    require('./templates').createall(req, res)
})

router.post('/template/delete', auth, (req, res) => {
    require('./templates').delete(req, res)
})


// Tables
router.post('/table/services', auth, (req, res) => {
    require('./services.route').services(req, res)
})

router.post('/table/serviceupdate', auth, (req, res) => {
    require('./services.route').update(req, res)
})

router.post('/table/delete', auth, (req, res) => {
    require('./services.route').delete(req, res)
})

router.post('/table/column', auth, (req, res) => {
    require('./tables').column(req, res)
})

router.post('/table/columndelete', auth, (req, res) => {
    require('./tables').columndelete(req, res)
})

router.post('/table/table', auth, (req, res) => {
    require('./tables').table(req, res)
})

router.post('/table/tabledelete', auth, (req, res) => {
    require('./tables').tabledelete(req, res)
})

router.post('/table/createall', auth, (req, res) => {
    require('./tables').createall(req, res)
})

// Clients
router.post('/clients/getclients', auth, (req, res) => {
    require('./getclients.route').getAll(req, res)
})

router.post('/clients/gettemplates', auth, (req, res) => {
    require('./getclients.route').gettemplates(req, res)
})

router.post('/clients/updateservice', auth, (req, res) => {
    require('./getclients.route').gettemplates(req, res)
})
module.exports = router
