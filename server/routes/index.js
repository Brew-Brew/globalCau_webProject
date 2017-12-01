var express = require('express');
var router = express.Router();
var passport = require('passport');
var gravatar = require('gravatar');
var Users = require('../models/users');
var Posting = require('../models/posting');
var Images = require('../models/posting_photo');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mime = require('mime');

var IMAGE_TYPES = ['image/jpeg','image/jpg', 'image/png'];

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
  Posting.find({"category": "notice"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "notice"
      });
    });
});

router.get('/posting/notice', function(req, res) {
  Posting.find({"category": "notice"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "notice"
      });
    });
});

router.get('/posting/free_posting', function(req, res) {
  // Render result
  Posting.find({"category": "free_posting"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "free_posting"
      });
    });
});

router.get('/posting/recruiting_study', function(req, res) {
  // Render result
  Posting.find({"category": "recruiting_study"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "recruiting_study"
      });
    });
});

router.get('/posting/meet', function(req, res) {
  // Render result
  Posting.find({"category": "meet"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "meet"
      });
    });
});

router.get('/posting/photo', function(req, res) {
  // Render result
  Images.find().sort('-created').populate('user', 'local.email').exec(function(error, images) {
      if (error) {
          return res.status(400).send({
              message: error
          });
      }
      // REnder galley
      res.render('content_posting_photo', {
          title: 'Global CAU',
          user:req.user,
          images: images,
          gravatar: gravatar.url(images.email ,  {s: '80', r: 'x', d: 'retro'}, true)
      });
  });
});

router.get('/posting/qna', function(req, res) {
  // Render result
  Posting.find({"category": "qna"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "qna"
      });
    });
});

router.get('/inf', function(req, res) {
  // List all connects and sort by Date
Posting.find({"category": "lecture"}).sort({date:-1}).exec(function(error, postings) {
    console.log(postings);
    if (error) {
        return res.send(400, {
            message: error
        });
    }
    res.render('content_inf', {
      num: 1,
      posting: postings,
      title: 'Global CAU',
      user: req.user,
      mode: "Lecture"
    });
  });
});

router.get('/inf/lecture', function(req, res) {
  // List all connects and sort by Date
Posting.find({"category": "lecture"}).sort({date:-1}).exec(function(error, postings) {
    console.log(postings);
    if (error) {
        return res.send(400, {
            message: error
        });
    }
    res.render('content_inf', {
      num: 1,
      posting: postings,
      title: 'Global CAU',
      user: req.user,
      mode: "Lecture"
    });
  });

});

router.get('/inf/advertise', function(req, res) {
  // Render result
  Posting.find({"category": "advertise"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Advertise"
      });
    });
});

router.get('/inf/housing', function(req, res) {
  // Render result
  Posting.find({"category": "housing"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Housing"
      });
    });
});

router.get('/inf/lost_found', function(req, res) {
  // Render result
  Posting.find({"category": "lost_found"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Lost_Found"
      });
    });
});

router.get('/inf/others', function(req, res) {
  // Render result
  Posting.find({"category": "others"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Others"
      });
    });
});

router.get('/inf/part_time_job', function(req, res) {
  // Render result
  Posting.find({"category": "part_time_job"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Part_Time_Job"
      });
    });
});

router.get('/inf/restaurant', function(req, res) {
  // Render result
  Posting.find({"category": "restaurant"}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      res.render('content_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user,
        mode: "Restaurant"
      });
    });
});

router.get('/post', function(req, res) {
  res.render('post_element', {
    title: 'post',
    user: req.user
  });
});

router.get('/inf/write', function(req, res) {
  res.render('inf_writing', {
    title: 'Global CAU',
    user: req.user
  });
});
router.get('/posting/write', function(req, res) {
  // Render result
  res.render('post_writing', {
    title: 'Global CAU',
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
    res.redirect('/' + req.body.menu + '/' + posting.category);
  });
});

router.post('/update', function(req, res) {
  console.log(req.body);
  Posting.find({"_id": req.body.id}).sort({date:-1}).exec(function(error, posting) {
    posting[0].title = req.body.title;
    posting[0].content = req.body.content;
    posting[0].save(function(err) {
      if (err) {
        console.log(err);
        res.redirect('/home');
      }
      res.redirect('/' + req.body.menu + '/' + posting[0]._id);
    });
    });
});

router.get('/posting/:id', function(req, res) {
  Posting.find({"_id": req.params.id}).sort({date:-1}).exec(function(error, postings) {
    postings[0].views +=1;
    postings[0].save();
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('read_posting', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user
      });
    });
});
router.get('/inf/:id', function(req, res) {
  Posting.find({"_id": req.params.id}).sort({date:-1}).exec(function(error, postings) {
    console.log(postings);
    postings[0].views +=1;
    postings[0].save();
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('read_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user
      });
    });
});

router.get('/delete/:id', function(req, res){
    console.log(req.params.id);
    Posting.remove({ _id : req.params.id }, function(err){
        res.redirect('back');
    });
});

router.get('/inf/update/:id', function(req, res){
  Posting.find({"_id": req.params.id}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('update_inf', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user
      });
    });
});

router.get('/posting/update/:id', function(req, res){
  Posting.find({"_id": req.params.id}).sort({date:-1}).exec(function(error, postings) {
      console.log(postings);
      if (error) {
          return res.send(400, {
              message: error
          });
      }
      // Render result
      // Render result
      res.render('update_post', {
        num: 1,
        posting: postings,
        title: 'Global CAU',
        user: req.user
      });
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
  successRedirect: '/intro',
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
  successRedirect: '/intro',
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
  res.redirect('/intro');
});


module.exports = router;
