const router = require('express').Router();
const Home = require('./controllers/home');

router
  .get('/:id', Home.read)
  .put('/:id', Home.update)
  .delete('/:id', Home.delete);

router
  .get('/', Home.index)
  .post('/', Home.create);

module.exports = router;