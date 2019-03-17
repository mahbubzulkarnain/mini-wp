const jwt = require('jsonwebtoken');

module.exports = {
  sign: function (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  verify: function (payload) {
    return jwt.verify(payload, process.env.JWT_SECRET)
  }
};