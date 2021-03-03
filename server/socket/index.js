const controller = require('../controllers/message.controller')

const socketConnection = socket => {
	console.log('a user connected', socket.id)

	socket.on('disconnect', function () {
		console.log('A user disconnected', socket.id)
	})

	socket.on('CHAT_ROOM_FROM_CLIENT', async props => {
		const message = await controller.create(props)
		socket.broadcast.emit(`CHAT_ROOM_${props.roomId}_FROM_SERVER`, message)
		socket.emit(`CHAT_ROOM_${props.roomId}_FROM_SERVER_MY`, message)
	})

	socket.on('REMOVE_MESSAGE_FROM_CLIENT', async props => {
		const id = await controller.remove(props)
		socket.broadcast.emit(`REMOVE_MESSAGE_FROM_SERVER`, id)
		socket.emit(`REMOVE_MESSAGE_FROM_SERVER`, id)
	})

	socket.on('EDIT_MESSAGE_FROM_CLIENT', async props => {
		const message = await controller.edit(props)
		socket.broadcast.emit(`EDIT_MESSAGE_FROM_SERVER`, message)
		socket.emit(`EDIT_MESSAGE_FROM_SERVER`, message)
	})
}

module.exports = {
	socketConnection,
}
