
const User = require('../models/users')
const asyncWrapper = require('../middlewares/async')
const {
	NotFoundError,
	BadRequestError,
	AuthorizationError
} = require('../errors')

const getUsersDev = asyncWrapper( async(req, res)=>{
	let users = await User.find({})
	res.status(200).json({count: users.length, users})
})

const getUser = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const user = await User.findOne({_id: userId})
						 .select('-password')
	if (!user) {
		throw new NotFoundError('User not found!')
	}
	res.status(200).json(user)
})

const putUser = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const user = await User.findOneAndUpdate({_id: id}, req.body, {
		new: true,
		runValidators: true
	}).select('-password')
	if (!user) {
		throw new NotFoundError('User not found!')
	}
	res.status(200).json(user)
})

const deleteUser = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const user = await User.findOneAndDelete({_id: userId})
	if (!user) {
		throw new NotFoundError('User not found!')
	}
	res.status(200).json({msg: `User ${userId} deleted!`})
})

const login = asyncWrapper( async(req, res)=>{
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError('Email and password are required!')
	}
	let user = await User.findOne({email})
	if (!user) {
		throw new AuthorizationError('User doesnt exist!')
	}
	let isSamePass = await user.comparePass(password)
	if (!isSamePass) {
		throw new AuthorizationError('Incorrect password!')
	}
	let token = await user.genToken()
	user.password = ''
	res.status(200).json({token, user})
})

const register = asyncWrapper( async(req, res)=>{
	let user = await User.create(req.body)
	let token = await user.genToken()
	user.password = ''
	res.status(200).json({token, user})
})

module.exports = {
	login,
	getUser,
	putUser,
	register,
	deleteUser,
	getUsersDev
} 