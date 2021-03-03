require('dotenv').config()

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	APP_IP: process.env.APP_IP,
	APP_PORT: process.env.APP_PORT,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}