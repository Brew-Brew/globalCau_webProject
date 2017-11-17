var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },

  iotaction: {
    type: String,
    default: '',
    // 공백 trim
    trim: true,
    required: ''
  },
  iotevent: {
    type: String,
    default: '',
    trim: true,
    required: ''
  },
  input_number: {
    type: String,
    default: '',
    trim: true,
    required: ''
  },
  output_number: {
    type: String,
    default: '',
    trim: true,
    required: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Connects',connectSchema);
