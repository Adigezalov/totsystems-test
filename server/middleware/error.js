const apiError = require('../apiError')

const error = (err, req, res, next) => {
	if (err instanceof apiError) {
		return res.status(err.status).json({message: err.message})
	}
	return res.status(500).json({message: 'Unexpected error.'})
}

module.exports = error
