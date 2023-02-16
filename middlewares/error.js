
const StatusCodes = require('http-status-codes')

const errorMiddleware = (err, req, res, next) => {

	const errObject = {
		code: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Try again later...'
	}

	if (err.name==='ValidationError') {
		errObject.code = StatusCodes.BAD_REQUEST
		let msgs = Object.keys(err.errors).map(field=>{
			return err.errors[field].properties.message
		})
		errObject.msg = msgs.join(', ')
	}

	if (err.code===11000) {
		errObject.code = StatusCodes.BAD_REQUEST
		let msg = Object.keys(err.keyValue).reduce((a,b)=>{
			return a.concat(err.keyValue[b] + ', ')
		}, '')
		errObject.msg = msg + 'Already in use!'
	}

	if (err.name==='CastError') {
		errObject.code = StatusCodes.BAD_REQUEST
		errObject.msg = `Unvalid argument for ${err.path}`
	}

	res.status(errObject.code).json({msg:errObject.msg})

}

module.exports = errorMiddleware