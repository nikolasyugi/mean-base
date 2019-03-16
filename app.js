global.__basedir = __dirname;

var modules = require(__basedir + '/api/modules.js')();
var keys = require(__basedir + '/api/keys.js')();

const express = modules.express;
const app = express();
const path = modules.path;
const cors = modules.cors;
const helmet = modules.helmet;
const passport = modules.passport;
const mongoose = modules.mongoose;
const session = require('express-session');
var RedisStore = require('connect-redis')(session);

var schemas = require(__basedir + '/api/configSchemas.js')(modules.mongoose, modules.bcrypt);
var redis = require(__basedir + '/api/redis.js')(modules.redis);

app.use(modules.bodyParser.urlencoded({ extended: false }));
app.use(modules.bodyParser.json());

var sessionSecret;

if (process.env.NODE_ENV == 'development') {
    sessionSecret = "session-cat"
} else if (process.env.NODE_ENV == 'production') { 
    sessionSecret = require('crypto').randomBytes(64).toString('hex')
}

app.use(session({
    store: new RedisStore({client: redis}),
    secret:  sessionSecret,
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

var passportSetup = require('./api/local-strategy')(schemas, modules.passport)

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

const { google } = modules.google;    
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    keys.google.clientID,
    keys.google.clientSecret,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: keys.google.refreshToken
});
const accessToken = oauth2Client.refreshAccessToken()
    .then(res => res.credentials.access_token);
var transporter = modules.nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: keys.configEmail.email,
        clientId: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        refreshToken: keys.google.refreshToken,
        accessToken: accessToken
    }
});

// var transporter = modules.nodemailer.createTransport('smtps://' + keys.configEmail.email + ':' + keys.configEmail.password + '@smtp.gmail.com');

var server = require(__basedir + '/api/server.js')(keys, modules, schemas, transporter, uidgen, redis);


app.use(express.static(__basedir + '/dist/mean-base'));

server(app)();

app.get('/*', function (req, res) {
    res.sendFile(path.join(__basedir + '/dist/mean-base/index.html'));
});

return http.listen(process.env.PORT || 8080, function () {
    console.log(`Server is on, listening on: ${process.env.PORT || 8080}`);
});