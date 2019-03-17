const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  featured_image: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: (require('../user/index')).collection.name
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: (require('../tag/index')).collection.name
  }],
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: null
  }
});

articleSchema.plugin(require('./middlewares'));
articleSchema.statics = {...articleSchema.statics, ...(require('./statics'))};

module.exports = mongoose.model('articles', articleSchema);