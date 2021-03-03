const Router = require('express')
const controller = require('../controllers/authorization.controller')
const router = new Router()

router.post('/login', controller.login)

module.exports = router
