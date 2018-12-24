module.exports = function (schemas) {

	var User = schemas.User;

	return {
		get: function (req, res) {

			// var user = new User({
			// 	name: 'Chriss',
			// 	username: 'sevilayha',
			// 	email: 'a@aasdasdasdasdasdsaszzzsz.com',
			// 	password: 'password'
			// });

			// user.save(function(err) {
			// 	if (err) throw err;

			// 	console.log('User saved successfully!');
			// 	var user = res.locals.user;
			// });
			User.find({}, function (err, users) {
				if (err) throw err;
				else res.send(users);
			});



		},

		put: function (req, res) {

			var user = res.locals.user;

			var body = req.body;

			User.update(body, { where: { email: user.email } }).then(function (userDB) {
				return res.json({ success: true, message: 'Dados alterados com sucesso!' });
			}).catch(function (err) {
				return res.status(400).json({ success: false, err: err });
			});

		}

	}
}