var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Club = mongoose.model('Club');

router.get('/home', function(req, res, next) {
    Event.find({}, 'event_name short_info event_date event_club', function(err, events){
        if(err){ return next(err); }

    	res.json(events);
  	});
});

//7 routes for 7 clubs

	//sci-tech(0) -- electroparichay(0)
	router.get('/0/0', function(req, res, next){
		Event.find({event_club : 'electroparichay'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});

	//sci-tech(0) -- robotics(3)
	router.get('/0/3', function(req, res, next){
		Event.find({event_club : 'robotics'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});

	//sci-tech(0) -- techclub(5)
	router.get('/0/5', function(req, res, next){
		Event.find({event_club : 'techclub'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});

	//Art & literary(1) -- fiducia(1)
	router.get('/1/1', function(req, res, next){
		Event.find({event_club : 'fiducia'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});

	//Art & literary(1) --mad(2)
	router.get('/1/2', function(req, res, next){
		Event.find({event_club : 'mad'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});

	//Art & literary(1) -- sched(4)
	router.get('/1/4', function(req, res, next){
		Event.find({event_club : 'sched'}, 'event_name short_info event_date event_club', function(err, events){
			if(err){return next(err); }

			res.json(events);
		});
	});



//Routes to perticular events
	router.param('event', function(req, res, next, id) {
	  	var query = Event.findById(id);

	  	query.exec(function (err, event){
	    	if (err) { return next(err); }
	    	if (!event) { return next(new Error('can\'t find post')); }

	    	req.event = event;
	    	return next();
	  });
	});

	router.get('/:event', function(req, res) {
  		res.json(req.event);
	});

//Route to post an event
	router.post('/home', function(req, res, next) {
	  var event = new Event(req.body);

	  event.save(function(err, event){
	    if(err){ return next(err); }

	    res.json(event);
	  });
	});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
