module.exports = function (schemas, passport) {

	var LocalStrategy = require('passport-local').Strategy;
	var User = schemas.User;
	var bcrypt = require('bcryptjs')
	passport.use(new LocalStrategy({

		usernameField: 'email',
		passwordField: 'password'
	},
		function (username, password, done) {
			userData = {
				email: username,
				password: password
			}
			User.findOne({ email: username }, function (err, userFound) {
				if (err) { return done(err); }
				if (!userFound) { return done(null, false, { err: "User not found" }); }
				if (!userFound.verifyPassword(password)) { return done(null, false, {err: "Invalid password"}); }
				return done(null, userFound);
			})
		}
	));
}