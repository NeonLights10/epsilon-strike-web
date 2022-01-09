const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

const warnSchema = new mongoose.Schema({
	_id: mongoose.ObjectId,
	time: Date,
	server_id: Number,
	user_name: String,
	user_id: {
	    type: Long,
	    transform: v => v.toString()
	},
	moderator: String,
	message_link: String,
	reason: String
});

warnSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Warn', warnSchema, 'warns');