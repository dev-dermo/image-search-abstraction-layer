var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	term: String,
	when: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Search', SearchSchema);