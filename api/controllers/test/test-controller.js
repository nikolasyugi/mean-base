module.exports = function (schemas) {

	var User = schemas.User;


	return {
		get: function (req, res) {
			console.log( 'asdas')
			return res.json({ message: 'API is working!' })

		},

		getAuth: function (req, res) {

			return res.json({ message: 'You\'re authorized!' })

		}
	}
}