const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: null
  },
  googleToken: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

userSchema.plugin(require('./middlewares'));

module.exports = mongoose.model('users', userSchema);