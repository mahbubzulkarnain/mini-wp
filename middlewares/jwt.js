const {verify} = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  var token = req.headers['authorization'];
  if (token && token.split(' ')[0] === 'Bearer') {
    try {
      token = verify(token.split(' ')[1], process.env.JWT_SECRET);
      if (token) {
        res.locals.user = token;
        return next()
      }
    } catch (e) {
      console.log(e)
    }
  }
  res
    .status(401)
    .json({
      message: 'Unauthorized'
    })
};