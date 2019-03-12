const router = require('express').Router();
const Home = require('./controllers/home');

router
  .get('/create', Home.create)
  .get('/read/:id', Home.read)
  .get('/edit/:id', Home.edit)
  .get('/list', Home.list)
  .get('/', Home.index);

module.exports = router;