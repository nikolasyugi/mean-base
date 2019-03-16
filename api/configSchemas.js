module.exports = function (mongoose, bcrypt) {

	//Schemas
	var schemas = {};
	schemas.User = require(__basedir + '/api/models/User.js')(mongoose, bcrypt);

	return schemas;
}