const uuid = require('uuid')
const fs = require('fs')
const apiError = require('../apiError')
const MESSAGES = require('../data/messages.json')
const USERS = require('../data/users.json')

class RoomController {
	async getAll(req, res, next) {
		try {
			const {room} = req.params
			const message = MESSAGES.filter(item => item.room_id === +room)
			res.json(message)
		} catch (e) {
			next(apiError.badRequest(e.message))
		}
	}

	async create(props) {
		try {
			const {roomId, message, user} = props
			const creator = USERS.filter(item => +item.id === +user)
			const newMessage = {
				id: uuid.v4(),
				room_id: +roomId,
				user: {
					id: creator[0].id,
					username: creator[0].username,
				},
				message,
			}
			MESSAGES.push(newMessage)
			let newMessages = JSON.stringify(MESSAGES, null, '\t')
			await fs.writeFile('./data/messages.json', newMessages, function (err) {
				if (err) return console.error(err)
			})
			return newMessage
		} catch (e) {
			console.log({e})
		}
	}

	async remove(props) {
		try {
			const {id} = props

			let newMessages = MESSAGES.filter(item => item.id !== id)

			newMessages = JSON.stringify(newMessages, null, '\t')
			await fs.writeFile('./data/messages.json', newMessages, function (err) {
				if (err) return console.error(err)
			})
			return id
		} catch (e) {
			console.log({e})
		}
	}

	async edit(props) {
		try {
			const {id, message} = props
			let messageIndex = MESSAGES.findIndex(item => item.id === id)
			const newMessage = MESSAGES[messageIndex]
			newMessage.message = message
			MESSAGES.splice(messageIndex, 1, newMessage)
			let newMessages = JSON.stringify(MESSAGES, null, '\t')
			await fs.writeFile('./data/messages.json', newMessages, function (err) {
				if (err) return console.error(err)
			})
			return newMessage
		} catch (e) {
			console.log({e})
		}
	}
}

module.exports = new RoomController()
