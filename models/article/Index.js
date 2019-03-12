const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('articles', articleSchema);