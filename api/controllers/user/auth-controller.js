module.exports = function (keys, schemas, uidgen, transporter) {

	var User = schemas.User;
	var bcrypt = require('bcryptjs');
	return {
		
		signup: function (req, res) {

			var userData = req.body;

			User.create(userData).then(function (userCreated) {
				User.findAll({ where: { token: { [Op.ne]: null } }, attributes: ['token'] }).then(function (tokens) {

					var token = uidgen.generateSync();

					while (tokens.some(e => e.token === token)) {
						token = uidgen.generateSync();
					}

					User.update({ token: token }, { where: userCreated.dataValues }).then(function (quantity) {
						if (quantity[0] > 0) {
							var user_email = req.body.email;
							User.find({ where: { email: user_email } }).then(function (userDB) {

								return res.json({ success: true, token: token, user: userDB });
							})
						} else {
							return res.status(400).json({ success: false });
						}
					}).catch(function (err) {
						return res.status(400).json({ success: false, err: err });
					});
				});


			}).catch(function (err) {
				return res.status(400).json({ success: false, err: err });
			});
		},

		login: function (req, res) {

			var userData = req.body;
			User.find({ where: { email: userData.email } }).then(function (userFound) {
				User.findAll({ where: { token: { [Op.ne]: null } }, attributes: ['token'] }).then(function (tokens) {
					if (userFound) {
						bcrypt.compare(userData.password, userFound.password, function (err, result) {
							if (result) {
								var token = uidgen.generateSync();

								while (tokens.some(e => e.token === token)) {
									token = uidgen.generateSync();
								}
								User.update({ token: token }, { where: userFound.dataValues }).then(function (result) {
									console.log(result)
									if (result[0] > 0) {
										var user_email = req.body.email;
										User.find({ where: { email: user_email } }).then(function (userDB) {

											return res.json({ success: true, token: token, user: userDB });
										})
									} else {
										return res.status(400).json({ success: false });
									}
								}).catch(function (err) {
									return res.status(400).json({ success: false, err: err });
								});
							} else {
								return res.status(400).json({ message: "Incorrect password" });
							}
						});
					} else {
						return res.status(400).json({ message: "User not found" });

					}
				});
			});

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