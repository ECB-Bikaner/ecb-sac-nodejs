var mongoose = require('mongoose');

var ClubSchema = new mongoose.Schema({
	club_info : String
});

mongoose.model('Club', ClubSchema);