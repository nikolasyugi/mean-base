module.exports = function () {

	const dotenv = require('dotenv');
	dotenv.config();

	keys = {
		configEmail: {
			email: process.env.EMAIL,
			password: process.env.EMAIL_PASSWORD
		},
		dbUrl: process.env.MONGO_URL,
		googleApiKey: process.env.GOOGLE_API_KEY,
	}

	return keys;
}