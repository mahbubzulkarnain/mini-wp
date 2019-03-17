const {ObjectId} = require('mongoose').Types;

module.exports = {
  findOneBySlugWithArticles: async function (slug = ``) {
    let Article = require('../article/index');
    let tag = await this.findBySlug(slug);

    return Article
      .find({'tags': (tag && tag._id) || ObjectId()})
      .populate('tags')
      .populate('author','-password')
      .sort({created_at: -1})
  },
  findBySlug: function (slug = ``) {
    return this.findOne({slug: slug})
  },
  findOneOrCreate: function (condition, data) {
    return new Promise((resolve, reject) => {
      this
        .findOne(condition)
        .then((prop) => {
          if (prop) {
            resolve(prop)
          } else {
            resolve(this.create(data))
          }
        })
        .catch((err) => {
          reject(err)
        })
    });
  }
};