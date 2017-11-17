var express = require('express');
var router = express.Router();
var passport = require('passport');
var gravatar = require('gravatar');
var Users = require('../models/users');
var nodemailer = require('nodemailer');

/* GET intro page. */
router.get('/', function(req, res, next) {
  res.render('start', { title: 'global CAU' });
});


router.get('/intro', function(req, res) {
        // Render result
        res.render('intro',{ title: 'INTRO' });
});

router.get('/posting', function(req, res) {
        // Render result
        res.render('posting',{ title: 'INTRO' });
});

router.get('/information', function(req, res) {
        // Render result
        res.render('information',{ title: 'INFORMATION' });
});
router.get('/free', function(req, res) {
        // Render result
        res.render('free',{ title: 'free' });
});
router.get('/recruit', function(req, res) {
        // Render result
        res.render('recruit',{ title: 'recruit' });
});
router.get('/meet', function(req, res) {
        // Render result
        res.render('meet',{ title: 'meet' });
});
router.get('/photo', function(req, res) {
        // Render result
        res.render('photo',{ title: 'photo' });
});
router.get('/qna', function(req, res) {
        // Render result
        res.render('photo',{ title: 'qna' });
});
/* Create connects */
router.post('/intro', function(req, res) {

});

/* Get comment by */
router.get('/intro/:commentId', function(req, res, id) {

});

// Check authorization
function hasAuthorization(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};






router.get('/login',function(req,res,next){
  res.render('login', { title: 'Login', message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    //Success go to Profile Page / Fail go to login page
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));

router.get('/signup',function(req,res,next){
  res.render('signup', { title: 'Sign Up', message: req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('local-signup', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
}));

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile', { title: 'Profile Page', user : req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true) });
});

/* check if user is logged in */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
/* GET Logout Page */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/intro');
});


module.exports = router;
