var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myApp');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new schema({
	name: String,
	email: {type: String, unique: true},
	image: String,
	login_count: {type: Number, default: 1},
},{collection: "users"});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);