const jwt = require('jsonwebtoken')
const apiError = require('../apiError')
const {JWT_SECRET_KEY} = require('../keys')
const USERS = require('../data/users.json')

class AuthorizationController {
	async login(req, res, next) {
		try {
			const {username, password} = req.body

			if (!username || !password) {
				return next(apiError.badRequest(`Для авторизации заполните, пожалуйста, имя пользователя и пароль.`))
			}

			const foundUser = USERS.filter(item => item.username === username)[0]

			if (!foundUser) {
				return next(apiError.badRequest(`Пользователь ${username} не зарегистрирован.`))
			}

			if (password !== foundUser.password) {
				return next(apiError.forbidden(`Неверный логин или пароль.`))
			}

			const token = jwt.sign({id: foundUser.id}, JWT_SECRET_KEY)

			res.json({token: `Bearer ${token}`, username: foundUser.username, id: foundUser.id})
		} catch (e) {
			next(apiError.badRequest(e.message))
		}
	}
}

module.exports = new AuthorizationController()
