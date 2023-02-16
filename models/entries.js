
const mongoose = require('mongoose')

const colors = ['#ff76bd', '#7378ff', '#b0b3ff', '#f7afd6']

const months = [
	"January", "February", "March", "April", "May", "June",
 	"July", "August", "September", "October", "November", "December"
];

const days = [
'Sunday', 'Monday', 'Thuesday', 'Wednesday', 
'Thurday', 'Friday', 'Saturday'
]

const entriesSchema = new mongoose.Schema({
	content: {
		type: String,
		default: ''
	},
	mood: {
		type: Number,
		default: 2,
		enum: {
			values: [0,1,2,3,4],
			message: '{VALUE} not supported!'
		}
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	hour: String,
	day: String,
	date: String,
	year: String,
	color: String,
	seed: {
		type: Number,
		defaul: Math.random() + 0.5,
	}
}, {timestamps: true})

entriesSchema.pre('save', async function() {
	let date = new Date(this.createdAt)
	this.day = days[date.getDay()]
	this.year = this.year ?? date.getFullYear()
	this.color = colors[Math.floor(Math.random() * 3)]
	this.date = months[date.getMonth()] + ' ' + date.getDay()
	this.hour = date.toLocaleTimeString([], {
		hour12: true,  
		hour: "2-digit", 
		minute: "2-digit"
	})	
})


module.exports = mongoose.model('Entry', entriesSchema)