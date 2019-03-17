const router = require('express').Router();
const User = require('../controllers/user');

router
  .post('/google', User.google)
  .post('/login', User.login)
  .post('/register', User.create);

module.exports = router;