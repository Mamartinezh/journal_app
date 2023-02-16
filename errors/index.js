
const CustomError = require('./custom')
const NotFoundError = require('./notfound')
const BadRequestError = require('./badrequest')
const AuthorizationError = require('./authorization')

module.exports = {
	CustomError,
	NotFoundError,
	BadRequestError,
	AuthorizationError
}