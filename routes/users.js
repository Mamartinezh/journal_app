
const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

const {
	login,
	getUser,
	putUser,
	register,
	deleteUser,
	getUsersDev
} = require('../controllers/users')


router.route('/')
	.get(getUsersDev)
router.route('/user')
	.get(auth, getUser)
router.route('/login')
	.post(login)
router.route('/register')
	.post(register)
router.route('/:id')
	.put(auth, putUser)
	.delete(auth, deleteUser)


module.exports = router