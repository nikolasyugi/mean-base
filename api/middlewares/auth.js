module.exports = function (schemas, passport) {

	return {
		checkLogged: function (req, res, next) {
			if (!req.user) {
				res.status(401).send({ message: "You are not authenticated!" })
			} else {
				res.locals.user = req.user;
				next();
			}
		},

		checkAdmin: function (req, res, next) {
			if (!req.user || req.user.role != 'admin') {
				res.status(401).send({ message: "You are not authenticated!" })
			} else {
				res.locals.user = req.user;
				next();
			}
		}
	}

}