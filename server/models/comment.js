// Import Mongoose and password Encrypt
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var today = new Date();

// define the schema for User model
var commentSchema = mongoose.Schema({
    // Using local for Local Strategy Passport
        postId: String,
        title: String,
        content: String,
        date: {type: String, default: today.toDateString()},
        name: String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);
