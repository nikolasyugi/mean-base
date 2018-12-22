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
				User.findById("5c1e863cf37f422b7c8eccee", function(err, user) {
					if (err) throw err;
				  
					// we have the updated user returned to us
					console.log(user);
					if (user)
					return res.json(user.mapUser());
					else
					return res.json({null:null})
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