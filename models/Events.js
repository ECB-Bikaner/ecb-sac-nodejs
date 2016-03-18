var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	event_name : String,
	short_info : String,
	event_info : String,
	event_date : Date,
	event_club : String
});

mongoose.model('Event', EventSchema);