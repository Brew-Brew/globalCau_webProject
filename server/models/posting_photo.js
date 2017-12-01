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
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Images', postingPhotoSchema);
