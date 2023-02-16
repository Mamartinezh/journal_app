
const jwt = require('jsonwebtoken')
const asyncWrapper = require('./async')
const User = require('../models/users')
const { 
	AuthorizationError,
	NotFoundError
}  = require('../errors')

const authMiddleware = asyncWrapper( async (req, res, next) => {

	const { authorization } = req.headers

	if (!authorization || !authorization.startsWith('Bearer ')) {
		throw new AuthorizationError('Bad authorization headers!')
	}

	try {
		let token = authorization.split(' ')[1]
		let decoded = await jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({_id: decoded.userId})
		if (!user) {
			throw new NotFoundError('User doesnt exist!')
		}
		req.userId = decoded.userId
		next()
	} catch(error) {
		throw new AuthorizationError('Bad token!')
	}
})

module.exports = authMiddleware