

const Entry = require('../models/entries')
const asyncWrapper = require('../middlewares/async')
const ObjectId = require('mongoose').Types.ObjectId
const {
	NotFoundError
} = require('../errors')

const deleteAll = asyncWrapper( async(req, res)=>{
	await Entry.deleteMany()
	res.status(200).send('Deleted all!!')
})

const searchEntries = asyncWrapper( async(req,res)=>{
	const { userId } = req
	const { keywords, year, limit } = req.query
	let aggObject = []

	if (keywords) {
		let strExp = keywords.split(' ').join('|')
		strExp = '\\b(' + strExp + ')\\b'
		aggObject.push({ $match: { content: { $regex: strExp, $options: 'i'}} })
	}

	if (year) {
		aggObject.push( { $match: { year: year } } )
	}

	const entries = await Entry.aggregate([
		{ $match: { createdBy: ObjectId(userId) } },
		...aggObject
	])

	res.status(200).json(entries)
})

const getEntry = asyncWrapper( async(req,res)=>{
	const { userId } = req
	const { id : entryId } = req.params
	const entry = await Entry.findOne({_id: entryId, createdBy: userId})
	if (!entry) {
		throw new NotFoundError('Entry not found!')
	}
	res.status(200).json(entry)
})

const putEntry = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const {  id : entryId } = req.params
	console.log(req.body)
	const entry = await Entry.findOneAndUpdate({_id: entryId, createdBy: userId}, req.body, {
		new: true,
		runValidators: true
	})
	if (!entry) {
		throw new NotFoundError('Entry not found!')
	}
	res.status(200).json(entry)
})

const deleteEntry = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const {  id : entryId } = req.params
	const entry = await Entry.findOneAndDelete({_id: entryId, createdBy: userId})
	if (!entry) {
		throw new NotFoundError('Entry not found!')
	}
	res.status(200).json({msg: 'Deleted entry!'})	
})

const deleteEntries = asyncWrapper( async(req,res)=>{
	const { userId } = req
	const { ids } = req.body
	const entries = await Entry.deleteMany({_id: { $in: ids}, createdBy: userId})
	if (entries.length===0) {
		throw new NotFoundError('No entries match the delete querie!')
	}
	res.status(200).json({msg: 'Deleted entries!'})
})

const getEntries = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const fields = '-content -mood -day'
	const entries = await Entry.find({createdBy: userId}).select(fields)
	res.status(200).json(entries)
})

const postEntry = asyncWrapper( async(req, res)=>{
	const { userId } = req
	const entry = await Entry.create({...req.body, createdBy: userId})
	res.status(200).json(entry)
})

const getAllEntries = asyncWrapper( async(req, res)=>{
	const entries = await Entry.find({})
	res.status(200).json(entries)
})


module.exports = {
	getEntry,
	putEntry,
	postEntry,
	getEntries,
	deleteEntry,
	deleteEntries,
	getAllEntries,
	searchEntries,
	deleteAll
}