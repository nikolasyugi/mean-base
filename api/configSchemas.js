module.exports = function (mongoose, bcrypt) {

	//Schemas
	var schemas = {};
	schemas.User = require(__basedir + '/api/models/User.js')(mongoose, bcrypt);
	schemas.Banner = require(__basedir + '/api/models/Banner.js')(mongoose);

	return schemas;
}