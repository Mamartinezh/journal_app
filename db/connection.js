
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectDB = (url) => {
	return mongoose
			.connect(url)
			.then(()=>console.log('Connected to DB...'))
}

module.exports = connectDB