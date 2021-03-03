const app = require('./app')
const socket = require('socket.io')
const {APP_PORT, APP_IP} = require('./keys')
const {socketConnection} = require('./socket')

const server = app.listen(APP_PORT, APP_IP, 500, () => {
	console.log(`Server started on ${APP_PORT} port ${APP_IP}`)
})

const io = socket(server, {
	cors: {
		origin: '*',
	},
})

io.on('connection', socket => socketConnection(socket))
