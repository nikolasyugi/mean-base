module.exports = function (keys, schemas, uidgen, transporter, passport, bcrypt) {

	var User = schemas.User;
	return {

		signup: function (req, res) {

			var userData = req.body;
			userData.role = 'common';
			User.create(userData, function (err, user) {
				if (err) return res.json(err);
				else {
					req.login(user, function (err) {
						if (err) { return next(err); }
						return res.json(user.mapUser())
					});
				}
			});

		},

		logout: function (req, res) {
			req.logout(req.user, function (err) {
				if (err) { return next(err); }
				return res.json({ message: "You've been logged out" })
			});
		},

		sign_in: function (req, res) {
			if (req.user.role == 'admin') {
				return res.json(req.user.mapUser())
			} else {
				return res.json({ message: 'You are not authenticated' })
			}
		},

		login: function (req, res) {
			return res.json(req.user.mapUser())
		},

		changePassword: function (req, res) {

			var user = res.locals.user;

			var password = req.body.password;
			bcrypt.hash(password, 10).then(hash => {
				password = hash;
				User.update({ password: password }, { where: { email: user.email } }).then(function (userDB) {
					return res.json({ success: true, message: 'Password Changed' });
				})
			});
		},

		resetPassword: function (req, res) {

			var email = req.body.email;

			var email_token = uidgen.generateSync();

			var mailOptions = {
				from: '"Contato" <' + keys.configEmail.email + '>',
				to: email,
				subject: 'Pedido de nova senha',
				text: 'Para pedir uma nova senha clique no seguinte link: ' + keys.apiUrl + '/v1/confirm-password-email/' + email_token
			};

			User.update({ new_password_token: email_token }, { where: { email: email } }).then(function (userDB) {
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						return console.log(error);
					}
					return res.json({ success: true, message: 'Email sent' });
				});
			});
		},

		confirmPasswordEmail: function (req, res) {

			var emailToken = req.params.email_token;

			var senha = uidgen.generateSync();

			User.find({ where: { new_password_token: emailToken } }).then(function (userDB) {
				if (userDB) {
					var mailOptions = {
						from: '"Contato" <' + keys.configEmail.email + '>',
						to: userDB.email,
						subject: 'Nova Senha',
						text: 'Sua nova senha é ' + senha
					};

					User.update({ password: senha }, { where: { new_password_token: emailToken } }).then(function (UpdateDB) {

						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								return console.log(error);
							}
							return res.send('A sua nova senha foi enviada para o seu e-mail!');
						});
					})
				}
				else {
					return res.status(404).json({ success: false, message: 'User not found!' });
				}
			});
		}


	}
}