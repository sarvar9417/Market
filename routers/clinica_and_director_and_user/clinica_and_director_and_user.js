const { Router } = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

//========================================================
// Clinica
router.post('/clinica/register', (req, res) => {
  require('./clinica.route').register(req, res)
})

router.get('/clinica', (req, res) => {
  require('./clinica.route').getClinica(req, res)
})

//========================================================
//Director
router.post('/director/register', (req, res) => {
  require('./director.route').register(req, res)
})

router.post('/director/login', (req, res) => {
  require('./director.route').login(req, res)
})

router.post('/director', (req, res) => {
  require('./director.route').getDirector(req, res)
})

router.put('/director/update', (req, res) => {
  require('./director.route').update(req, res)
})

router.put('/director/updatepassword', (req, res) => {
  require('./director.route').updatePassword(req, res)
})

//========================================================
//User
router.post('/user/register', auth, (req, res) => {
  require('./user.route').register(req, res)
})

router.post('/user/login', (req, res) => {
  require('./user.route').login(req, res)
})

router.post('/user/gettype', auth,(req, res) => {
  require('./user.route').getUserType(req, res)
})

router.post('/user/getall', auth, (req, res) => {
  require('./user.route').getUsers(req, res)
})

router.post('/user/remove', auth, (req, res) => {
  require('./user.route').removeUser(req, res)
})

module.exports = router
