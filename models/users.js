
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Must provide email...'],
		unique: true,
		match: [/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
				'{VALUE} is not a valid email...']
	},
	username: {
		type: String,
		required: [true, 'Must provide username...'],
		minlength: [4, 'Username must have at least 4 characters...'],
		maxlength: [20, 'Username must have not more than 20 characters...'],
		trim: true
	},
	password: {
		type: String,
		required: [true, 'Must provide a password...'],
		trim: true,
		// validate: {
		// 	validator: function(v) {
		// 		return /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/.test(v)
		// 	}
		// },
		// message: '{VALUE} is not a valid password!'
	}
}, {timestamps: true})

usersSchema.pre('save', async function() {
	let salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

usersSchema.methods.comparePass = function(candidatePass) {
	return bcrypt.compare(candidatePass, this.password)
}

usersSchema.methods.genToken = function() {
	let payload = {
		userId: this._id,
		username: this.username
	}
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}


module.exports = mongoose.model('User', usersSchema)