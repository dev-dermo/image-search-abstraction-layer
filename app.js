var express = require('express');
var mongoose = require('mongoose');
var db = 'mongodb://localhost:27017/test';
var Search = require('./Search.model');
var request = require('request');

mongoose.connect(db);

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.send('Hello, World!');
});

// pull latest searches from mongo
app.get('/api/latest/imagesearch/', function(req, res) {
	console.log('This will show the latest searches, pulled from a mongodb');
	var result = {};

	Search.find().sort({ when: -1 }).limit(10).exec(function(err, doc) {
		if (err) { console.error('error getting latest searches'); }
		else {
			for (var i=0;i<doc.length;i++) { result[i] = { "term": doc[i].term, "when": doc[i].when } }
			res.json(result);
		}
	});
});

// save search to mongodb
app.use('/api/imagesearch/:searchQuery', function(req, res, next) {
	console.log('Did this but moved on.');

	var newSearch = new Search();
	newSearch.term = req.params.searchQuery;

	newSearch.save(function(err, term) {
		if (err) { console.error('Error saving search term.'); }
		else { console.log('Saved to db.'); }
	});

	next();
});

app.get('/api/imagesearch/:searchQuery', function(req, res) {
	var searchQuery = req.params.searchQuery;
	var offset = req.query.offset;
	console.log('This will search the imgur api for "' + searchQuery + '", with an offset of ' + offset);
	res.send('This will search the imgur api for "' + searchQuery + '", with an offset of ' + offset);
});

app.listen(app.get('port'), function() {
	console.log('App listening on port ' + app.get('port'));
});