const router = require('express').Router();
const Tag = require('../controllers/tag');

router
  .get('/:slug/articles', Tag.readWithArticles);
  // .get('/:slug', Tag.read)
  // .put('/:slug', Tag.update)
  // .delete('/:slug', Tag.delete);

// router
  // .get('/', Tag.list)
  // .post('/', Tag.create);

module.exports = router;