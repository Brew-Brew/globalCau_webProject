// Import Mongoose and password Encrypt
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var today = new Date();

// define the schema for User model
var postingSchema = mongoose.Schema({
    // Using local for Local Strategy Passport

        title: String,
        content: String,
        category: String,
        date: {type: String, default: today.toISOString().substring(0, 10)},
        views: String,
        name: String



});


// create the model for users and expose it to our app
module.exports = mongoose.model('Posting', postingSchema);
