const Router = require('express')
const authenticate = require('../middleware/authenticate')
const controller = require('../controllers/room.controller')
const router = new Router()

router.get('/', authenticate, controller.getAll)

module.exports = router
