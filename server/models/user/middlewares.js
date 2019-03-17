module.exports = function (schema) {
  schema
    .pre('save', async function (next) {
      const bcrypt = require('bcrypt');

      let findId = {};
      if (this._id) {
        findId = {
          _id: {
            $ne: this._id
          }
        }
      }

      if (await this.constructor.findOne({
        ...findId,
        email: this.email
      })) {
        throw this.invalidate('email', 'Email has already exist', this.email)
      }
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
      next();
    })
};