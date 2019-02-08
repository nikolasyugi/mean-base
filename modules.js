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

    // https://www.npmjs.com/package/helmet
    modules.helmet = require('helmet');

    // http://www.passportjs.org/docs/
    modules.passport = require('passport');
    modules.passportLocal = require('passport-local');

    // https://www.npmjs.com/package/redis
    modules.redis = require('redis');

    // https://www.npmjs.com/package/googleapis
    modules.google = require("googleapis");

    // https://www.npmjs.com/package/aws-sdk
	modules.aws = require('aws-sdk');

	// https://www.npmjs.com/package/async
	modules.async = require('async');

	// https://www.npmjs.com/package/multer
	modules.multer = require('multer');

    return modules;
}
