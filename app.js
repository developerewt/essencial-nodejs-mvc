var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var localStrategy   = require('passport-local');
var expressSession  = require('express-session');
var mongoose        = require('Mongoose');
var flash           = require('connect-flash');

//Application express - initialized.
var app             = express();

//Database connection instance.
var db = mongoose.connection;

db.on('error',console.error);
db.once('open',function() {
    console.log('Connected to MongoDB');
});

mongoose.connect('mongodb://localhost/essencial');

//Configure app view engine and path to views.
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app/views'));

//Use middleware
app.use('',express.static(path.join(__dirname,'public')));
//app.use('',express.static(path.join(__dirname,'bower_component')));
app.use(logger('dev'));
app.use(bodyParser({uploadDir: './public/images'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(expressSession({
    cookie: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//Authentication with passport
app.use(passport.initialize());
app.use(passport.session());

//Error handler Middleware
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.render('error',{
        message: err.message,
        error: err
    });
});

//MVC Pattern specification with Services.
var application = require('./app/routes/application');
//var api4r       = require('./app/routes/api');
app.use(application);
//app.use(api4r);

//Initialization
var port = process.env.PORT || 3000;
app.listen(port,function(){
   console.log('Ready on port '+port);
});