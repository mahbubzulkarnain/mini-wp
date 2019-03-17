const router = require('express').Router();
const Article = require('../controllers/article');

const jwt = require('../middlewares/jwt');
const images = require('../helpers/images/google');

router
  .get('/:slug', Article.read)
  .put('/:id', jwt, images.multer.single('file'), images.sendUploadToGCS, Article.update)
  .delete('/:id', jwt, Article.delete);

router
  .get('/', Article.index)
  .post('/', jwt, images.multer.single('file'), images.sendUploadToGCS, Article.create);

module.exports = router;