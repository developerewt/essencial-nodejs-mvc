var express             = require('express');
var router              = express.Router();
var application         = require('../controllers/application');
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var User                = require('../models/users');
var bcrypt              = require('bcrypt-nodejs');
var AuthValidator       = require('../validators/auth');

/**
 * index page
 *
 * Redirect to web site 4routes.
 *
 */
router.get('/',application.index);
router.get('/index',application.index);


/**
 * Create account post
 *
 * Send data to create account.
 *
 */
router.post('/createaccount',application.createAccount);

/**
 * Dashboard page
 *
 * Dashboard app. monitoring access.
 *
 */
router.get('/dashboard',AuthValidator.isLogged,application.dashboard);

//Authentication process
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(username,password,done){
    User.findOne({email: username}, function(err,user){
        if(!user)
        {
            return done(null,false,{message: 'Email incorreto.'});
        }

        var hash = bcrypt.hashSync(password);

        bcrypt.compare(password,hash,function(err,res){
            if(err) { console.log(err); }
            if(res) { return done(null,user); }
        });
    });
}));

//Serialize user
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

//Deserialize user.
passport.deserializeUser(function(email, done) {
    User.findOne({email: email}, function(err, user) {
        done(err, user);
    });
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/', failureFlash: false }),
    function(req, res) {
        console.log(req.user.email+' is successfully logged in.');
        console.log(JSON.stringify(req.user));
        res.redirect('/dashboard');
});

router.get('/logout',function(req, res){
    req.logout();
    res.redirect('/');
});

//Exporting module.
module.exports = router;