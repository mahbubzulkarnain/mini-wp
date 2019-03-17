const {verify} = require('jsonwebtoken');
const User = require('../models/user/index');

module.exports = async function (req, res, next) {
  const message = 'Unauthorized';
  var token = req.headers['authorization'];
  if (token && token.split(' ')[0] === 'Bearer') {
    try {
      token = verify(token.split(' ')[1], process.env.JWT_SECRET);
      if (token) {
        let prop = await User.findById(token.id);
        if (prop) {
          res.locals.user = {
            id: prop._id,
            full_name: prop.full_name,
            first_name: prop.first_name,
            last_name: prop.last_name
          };
          return next()
        }
      }
    } catch (e) {
      console.err(e)
    }
  }
  res
    .status(401)
    .json({
      message
    })
};