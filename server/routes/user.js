const router = require('express').Router();
const User = require('../controllers/user');

router
  .get('/', User.list)
  .post('/', User.create);

module.exports = router;