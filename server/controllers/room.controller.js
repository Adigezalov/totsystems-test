const apiError = require('../apiError')
const ROOMS = require('../data/rooms.json')

class RoomController {
	async getAll(req, res, next) {
		try {
			res.json(ROOMS)
		} catch (e) {
			next(apiError.badRequest(e.message))
		}
	}
}

module.exports = new RoomController()
