const Router = require('express')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/message.controller')
const router = new Router()

router.get('/:room', authenticate, controller.getAll)

module.exports = router
