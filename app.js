var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Import Routes
var multer  = require('multer');
var upload = multer({ dest:'./public/uploads/', limits: {fileSize: 1000000, files:1} });
var index = require('./server/routes/index');
var users = require('./server/routes/users');
var images = require('./server/routes/images');

// ODM With Mongoose
var mongoose = require('mongoose');
// Modules to store session
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
// Import Passport and Warning flash modules
var passport = require('passport');
var flash = require('connect-flash');
var net = require('net');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');


// Database configuration
var config = require('./server/config/config.js');
// connect to our database
mongoose.Promise = global.Promise;
mongoose.connect(config.url ,{
	useMongoClient:true
});
// Check if MongoDB is running
mongoose.connection.on('error', function() {
	console.error('MongoDB 연결오류, MongoDB를 연결해주세요.');
});

// Passport 설정
require('./server/config/passport')(passport);
var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.raw(options));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
// secret for session
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    //store session on MongoDB using express-session + connect mongo
    store: new MongoStore({
        url: config.url,
        collection : 'sessions'
    })
}));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// flash messages
app.use(flash());

app.post('/images', images.hasAuthorization, upload.single('image'), images.uploadImage);
app.use('/', index);
app.use('/home', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.set('port', process.env.PORT || 80);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
