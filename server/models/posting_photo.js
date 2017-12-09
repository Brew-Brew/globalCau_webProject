var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var today = new Date();

var postingPhotoSchema = mongoose.Schema({
  created: {
      type: Date,
      default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: ''
  },
  imageName: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  likes:{
    type: Number,
    default: 0
  },
  name:{
    type: String,
    default:'default'
  }
});

module.exports = mongoose.model('Images', postingPhotoSchema);
