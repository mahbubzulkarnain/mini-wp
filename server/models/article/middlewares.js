const bcrypt = require('bcrypt');

module.exports = function (schema) {
  schema
    .pre('save', async function (next) {
      console.log(this.tags, 'ini harusnya id');

      const slugify = require('slugify');

      this.created_at = new Date();
      this.slug = slugify(this.title) + (bcrypt.hashSync((new Date()).getTime() + '', bcrypt.genSaltSync(8))).replace(/\$_|[^\w]/g, '').substr(0, 12);
      this.slug = this.slug.toLowerCase();
      next();
    })
};