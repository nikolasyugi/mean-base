global.__basedir = __dirname;

var modules = require(__basedir + '/modules.js')();
var keys = require(__basedir + '/keys.js')();

const express = modules.express;
const app = express();
const path = modules.path;
const cors = modules.cors;
const helmet = modules.helmet;
const passport = modules.passport;
const mongoose = modules.mongoose;
const session = require('express-session');

var schemas = require(__basedir + '/api/configSchemas.js')(modules.mongoose, modules.bcrypt);

app.use(modules.bodyParser.urlencoded({ extended: false }));
app.use(modules.bodyParser.json());


app.use(session({
    secret: keys.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (userId, done) {
    schemas.User.findById(userId, (err, user) => done(err, user));
});


app.use(helmet());

let corsSettings = {
    origin: true,
    methods: ['POST'],
    credentials: true
};
app.use(cors(corsSettings));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});



var http = modules.http.createServer(app);

mongoose.connect(keys.dbUrl, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var uidgen = new modules.UIDGenerator();

var transporter = modules.nodemailer.createTransport('smtps://' + keys.configEmail.email + ':' + keys.configEmail.password + '@smtp.gmail.com');

var server = require(__basedir + '/api/server.js')(keys, modules, schemas, transporter, uidgen);


app.use(express.static(__basedir + '/dist/mean-base'));

server(app)();

app.get('/*', function (req, res) {
    res.sendFile(path.join(__basedir + '/dist/mean-base/index.html'));
});

return http.listen(process.env.PORT || 8080, function () {
    console.log(`Server is on, listening on: ${process.env.PORT || 8080}`);
});