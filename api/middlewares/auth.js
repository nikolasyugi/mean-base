module.exports = function (schemas) {

	var User = schemas.User;

	return {
		checkToken: function (req, res, next) {

			User.find({ where: { token: req.headers.token } }).then(function (userDB) {
				if (userDB) {
					res.locals.user = userDB

					next();
				} else {
					res.status(400).json({ success: 'fail', message: 'You are not authenticated!' });
				}
			});

		}
	}

}