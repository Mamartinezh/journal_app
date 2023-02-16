
const CustomError = require('./custom')
const StatusCodes = require('http-status-codes')

class BadRequestError extends CustomError {
	constructor(msg) {
		super(msg)
		this.statusCode = StatusCodes.BAD_REQUEST
	}
}

module.exports = BadRequestError