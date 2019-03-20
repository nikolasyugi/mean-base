module.exports = function (schemas) {

	var User = schemas.User;


	return {
		get: function (req, res) {
			return res.json({ message: 'API is working!' })

		},

		getAuth: function (req, res) {

			return res.json({ err: 'You\'re authorized!' })

		}
	}
}