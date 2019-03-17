module.exports = {
  findBySlug: function (slug = '') {
    return this
      .findOne({
        slug
      })
      .populate('tags')
      .populate('author','-password')
  }
};