module.exports = function () {
	var modules = {};

	//http://expressjs.com/
	modules.express = require('express');

	//https://nodejs.org/api/path.html
	modules.path = require('path');

	//https://www.npmjs.com/package/cors
	modules.cors = require('cors');

	//https://nodejs.org/api/http.html#http_http
	modules.http = require('http');

	//https://github.com/expressjs/body-parser
	modules.bodyParser = require('body-parser');

	//https://www.npmjs.com/package/mongoose
	modules.mongoose = require('mongoose');

	//https://www.npmjs.com/package/uid-generator
	modules.UIDGenerator = require('uid-generator');

	// https://github.com/nodemailer/nodemailer
	modules.nodemailer = require('nodemailer');

	// https://www.npmjs.com/package/request
	modules.request = require('request');

	// https://www.npmjs.com/package/bcryptjs
	modules.bcrypt = require('bcryptjs');

	return modules;
}
