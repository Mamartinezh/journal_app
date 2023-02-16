
const express = require('express')
const auth = require('../middlewares/auth')
const {
	getEntry,
	putEntry,
	postEntry,
	getEntries,
	deleteEntry,
	deleteEntries,
	getAllEntries,
	searchEntries,
	deleteAll
} = require('../controllers/entries')

const router = express.Router()

router.route('/deleteMany').delete(deleteAll)
router.route('/all')
	.get(getAllEntries)
router.route('/batchDelete')
	.post(auth, deleteEntries)
router.route('/search')
	.get(auth, searchEntries)
router.route('/')
	.get(auth, getEntries)
	.post(auth, postEntry)
router.route('/:id')
	.put(auth, putEntry)
	.get(auth, getEntry)
	.delete(auth, deleteEntry)


module.exports = router