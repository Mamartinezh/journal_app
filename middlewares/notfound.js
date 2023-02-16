
const path = require('path')

const notfoundMiddleware = (req, res) => {
	res.sendFile(path.resolve(__dirname, '/templates/notfound.html'))
}

module.exports = notfoundMiddleware