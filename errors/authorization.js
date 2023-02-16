
const CustomError = require('./custom')
const StatusCodes = require('http-status-codes')

class AuthorizationError extends CustomError {
	constructor(msg) {
		super(msg)
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
}

module.exports = AuthorizationError