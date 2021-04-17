const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
	_id: mongoose.ObjectId,
	time: Date,
	server_id: Number,
	user_name: String,
	user_id: Number,
	moderator: String,
	message_link: String,
	reason: String
});

module.exports = mongoose.model('Warn', warnSchema, 'warns');