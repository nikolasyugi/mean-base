module.exports = function (keys, modules, schemas, transporter, uidgen, redis) {

	//Middlewares
	var middlewares = {};
	middlewares.auth = require(__basedir + '/api/middlewares/auth.js')(schemas, modules.passport);

	//User
	var user = {};
	user.controllers = {};
	user.controllers.auth = require(__basedir + '/api/controllers/user/auth-controller.js')(keys, schemas, uidgen, transporter, modules.passport, modules.bcrypt);
	user.controllers.user = require(__basedir + '/api/controllers/user/user-controller.js')(schemas);

	//Test
	var test = {};
	test.controllers = {};
	test.controllers.test = require(__basedir + '/api/controllers/test/test-controller.js')(schemas);

	//Routes
	var routes = {};
	routes.routes = require(__basedir + '/api/routes/router.js')(modules.express, routes);

	//Version 1
	routes.v1 = {};
	routes.v1.test = require(__basedir + '/api/routes/v1/test.js')(middlewares, test);
	routes.v1.user = require(__basedir + '/api/routes/v1/user.js')(middlewares, user);

	return routes.routes;

}