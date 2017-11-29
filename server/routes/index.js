var express = require('express');
var router = express.Router();
var passport = require('passport');
var gravatar = require('gravatar');
var Users = require('../models/users');
var Posting = require('../models/posting');
var nodemailer = require('nodemailer');

/* GET intro page. */
router.get('/', function(req, res, next) {
  res.render('start', {
    title: 'Global CAU',
    user: req.user
  });
});

router.get('/intro', function(req, res) {
  // Render result
  res.render('content_intro', {
    title: 'Global CAU',
    user: req.user
  });
});

router.get('/posting', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: 'Notice'
  });
});

router.get('/posting/notice', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: 'Notice'
  });
});

router.get('/posting/free_posting', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: 'Free_Posting'
  });
});

router.get('/posting/recruiting_study', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: 'Recruting_Study'
  });
});

router.get('/posting/meet', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: "Let's_meet"
  });
});

router.get('/posting/photo', function(req, res) {
  // Render result
  res.render('content_posting_photo', {
    title: 'Global CAU',
    user: req.user,
    mode: "Photo"
  });
});

router.get('/posting/qna', function(req, res) {
  // Render result
  res.render('content_posting', {
    title: 'Global CAU',
    user: req.user,
    mode: "QnA"
  });
});

router.get('/inf', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Lecture"
  });
});

router.get('/inf/lecture', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Lecture"
  });
});

router.get('/inf/advertise', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Advertise"
  });
});

router.get('/inf/housing', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Housing"
  });
});

router.get('/inf/lost_found', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Lost_Found"
  });
});

router.get('/inf/others', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Others"
  });
});

router.get('/inf/part_time_job', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Part_Time_Job"
  });
});

router.get('/inf/restaurant', function(req, res) {
  // Render result
  res.render('content_inf', {
    title: 'Global CAU',
    user: req.user,
    mode: "Restaurant"
  });
});

router.get('/post', function(req, res) {
  // Render result
  res.render('post_element', {
    title: 'post',
    user: req.user
  });
});

router.get('/write', function(req, res) {
  // Render result
  res.render('post_writing', {
    title: 'write',
    user: req.user
  });
});

/* Create connects */
router.post('/write', function(req, res) {
  console.log(req.body);
  var posting = new Posting();
  posting.title = req.body.title;
  posting.name = req.body.name;
  posting.content = req.body.content;
  posting.category = req.body.category;
  posting.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect('/home');
    }
    res.redirect('/inf/advertise');
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

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login',
    user: req.user,
    message: req.flash('loginMessage')
  });
});

router.post('/login', passport.authenticate('local-login', {
  //Success go to Profile Page / Fail go to login page
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up',
    user: req.user,
    message: req.flash('signupMessage')
  });
});

router.post('/signup', passport.authenticate('local-signup', {
  //Success go to Profile Page / Fail go to Signup page
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {
    title: 'Profile Page',
    user: req.user,
    avatar: gravatar.url(req.user.email, {
      s: '100',
      r: 'x',
      d: 'retro'
    }, true)
  });
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
