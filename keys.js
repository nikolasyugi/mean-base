module.exports = function () {

	const dotenv = require('dotenv');
	dotenv.config();

	keys = {
		configEmail: {
			email: process.env.EMAIL,
			password: process.env.EMAIL_PASSWORD
		},
        dbUrl: process.env.MONGO_URL,
        apiUrl: process.env.API_URL,
		googleApiKey: process.env.GOOGLE_API_KEY,
		configAWS: {
			accessKeyId: process.env.AWS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			region: process.env.REGION,
			bucketName: process.env.BUCKET_NAME
		},
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			refreshToken: process.env.GOOGLE_REFRESH_TOKEN
        },
        projectName: process.env.PROJECT_NAME
	}

	return keys;

	return keys;
}