var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/api/latest/imagesearch/', function(req, res) {
	res.send('This will show the latest searches, pulled from a mongodb');
});

app.get('/api/imagesearch/:searchQuery', function(req, res) {
	var searchQuery = req.params.searchQuery;
	var offset = req.query.offset;
	res.send('This will search the imgur api for ' + searchQuery + ', with an offset of ' + offset);
});

app.listen(app.get('port'), function() {
	console.log('App listening on port ' + app.get('port'));
});