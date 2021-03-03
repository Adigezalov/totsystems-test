const Router = require('express')
const authorizationRoutes = require('./authorization.routes')
const roomRoutes = require('./room.routes')
const messageRoutes = require('./message.routes')

const router = new Router()

router.use('/authorization', authorizationRoutes)
router.use('/room', roomRoutes)
router.use('/message', messageRoutes)

module.exports = router
