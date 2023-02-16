

class CustomError extends Error {
	constructor(msg) {
		super(msg)
	}
}

const createCustomError = (msg) => {
	return new CustomError(msg)
}

module.exports = CustomError