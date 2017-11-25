var express = require('express');
var router = express.Router();
var passport = require('passport');
var gravatar = require('gravatar');
var Users = require('../models/users');
var Posting = require('../models/posting');
var nodemailer = require('nodemailer');

/* GET intro page. */
router.get('/', function(req, res, next) {
  res.render('start', { title: 'global CAU', user : req.user});
});


router.get('/intro', function(req, res) {
        // Render result
        res.render('intro',{ title: 'INTRO',user : req.user });
});

router.get('/posting', function(req, res) {
        // Render result
        res.render('posting',{ title: 'INTRO',user : req.user });
});

router.get('/information', function(req, res) {
        // Render result
        res.render('information',{ title: 'INFORMATION',user : req.user });
});
router.get('/free', function(req, res) {
        // Render result
        res.render('free',{ title: 'free',user : req.user });
});
router.get('/recruit', function(req, res) {
        // Render result
        res.render('recruit',{ title: 'recruit',user : req.user });
});
router.get('/meet', function(req, res) {
        // Render result
        res.render('meet',{ title: 'meet',user : req.user });
});
router.get('/photo', function(req, res) {
        // Render result
        res.render('photo',{ title: 'photo',user : req.user });
});
router.get('/qna', function(req, res) {
        // Render result
        res.render('qna',{ title: 'qna',user : req.user });
});
router.get('/i_advertise', function(req, res) {
        // Render result
        res.render('i_advertise',{ title: 'advertise',user : req.user });
});
router.get('/i_housing', function(req, res) {
        // Render result
        res.render('i_housing',{ title: 'housing',user : req.user });
})
router.get('/i_lecture', function(req, res) {
        // Render result
        res.render('i_lecture',{ title: 'lecture',user : req.user });
});
router.get('/i_lf', function(req, res) {
        // Render result
        res.render('i_lf',{ title: 'lf',user : req.user });
});
router.get('/i_others', function(req, res) {
        // Render result
        res.render('i_others',{ title: 'others',user : req.user });
});
router.get('/i_post', function(req, res) {
        // Render result
        res.render('i_post',{ title: 'post',user : req.user });
});
router.get('/i_ptj', function(req, res) {
        // Render result
        res.render('i_ptj',{ title: 'ptj',user : req.user });
});
router.get('/i_restaurant', function(req, res) {
        // Render result
        res.render('i_restaurant',{ title: 'restaurant',user : req.user });
});
router.get('/i_write', function(req, res) {
        // Render result
        res.render('i_write',{ title: 'write',user : req.user });
});
/* Create connects */
router.post('/i_write', function (req, res) {
  console.log(req.body);
  var posting = new Posting();
  posting.title = req.body.title;
  posting.name = req.body.name;
  posting.content = req.body.content;
  posting.category = req.body.category;
  posting.save(function (err) {
    if(err){
      console.log(err);
      res.redirect('/home');
    }
    res.redirect('/i_advertise');
  });
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
  res.render('login', { title: 'Login', user : req.user, message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    //Success go to Profile Page / Fail go to login page
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));

router.get('/signup',function(req,res,next){
  res.render('signup', { title: 'Sign Up', user : req.user, message: req.flash('signupMessage')});
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
    res.redirect('/');
});


module.exports = router;
