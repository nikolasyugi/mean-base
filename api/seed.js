/***************************/
var name = "Admin"
var email = "admin@gmail.com"
var password = "12345678"
/***************************/




const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User.js')(mongoose, bcrypt);
const keys = require('./../keys')()

mongoose.connect(keys.dbUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var u = new User({
	name: name,
	email: email,
	password: password,
	role: 'admin'
})

User.findOne({ role: "admin", email: email }, function (err, user) {
	if (err) throw err;
	else {
		if (!user) {
			u.save(function (err, user) {
				if (err) {
					throw err;
				}
				else {
					console.log('User created successfully')
					process.exit(0)
				}
			});
		}
		else {
			console.log('User already exists')
			process.exit(0)
		}
	}
});
