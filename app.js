
const morgan = require('morgan')
const express = require('express')
const connectDB = require('./db/connection')

// Middlewares
const errorMiddleware = require('./middlewares/error')
const notfoundMiddleware = require('./middlewares/notfound')

// Routers
const userRouter = require('./routes/users')
const entryRouter = require('./routes/entries')

// Extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

require('dotenv').config()

const app = express()

app.use(express.static('./build'))

app.set('trust prosxy', 1)
app.use(
	rateLimiter({
		windowMS: 15 * 60 * 1000,
		max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/users', userRouter)

app.use('/api/v1/entries', entryRouter)

app.use(notfoundMiddleware)

app.use(errorMiddleware)


const port = process.env.PORT || 5000

const start = async () => {

	try {
		await connectDB(process.env.DB_URL)
		app.listen(port,()=>{
			console.log(`Listening on port ${port}`)
		})
	} catch(error) {
		console.log(error)
	}

}

start()
