// Import Mongoose and password Encrypt
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for User model
var postingSchema = mongoose.Schema({
    // Using local for Local Strategy Passport

        title: String,
        content: String,
        category: String,
        date: {type: Date, default: Date.now()},
        views: String,
        name: String



});


// create the model for users and expose it to our app
module.exports = mongoose.model('Posting', postingSchema);
