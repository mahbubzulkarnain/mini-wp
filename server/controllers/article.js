const Article = require('../models/article/index');
const Tag = require('../models/tag/index');
const slugify = require('slugify');
const google = require('../helpers/images/google');

class ArticleController {
  static async create(req, res) {
    const {body} = req;
    body['author'] = res.locals.user.id;
    if (body.tags.length && !(body.tags instanceof Array)) {
      body.tags = [body.tags];
    }

    if (req.file && req.file.cloudStoragePublicUrl) {
      body.featured_image = req.file.cloudStoragePublicUrl;
    }

    if (body.tags && body.tags.length) {
      var tags = [];
      for (let i = 0; i < body.tags.length; i++) {
        let tag = body.tags[i];
        try {
          let slug = (slugify(tag) + '').toLowerCase();
          let dataTag = await Tag.findOneOrCreate({$or: [{name: tag}, {slug: slug}]}, {
            name: tag.replace(/[^\w\s\-]/gi, '').replace(/\s+/gi, ' '),
            slug: slug
          });
          tags.push(dataTag._id);
        } catch (e) {
          console.log(e, 'ini error for tags')
        }
      }
      body.tags = tags;
    }
    (new Article(body))
      .save((err, data) => {
        if (err) {
          console.error(err, 'ini error save');
          res
            .status(500)
            .json({
              message: `Internal server error`
            })
        } else {
          res
            .status(201)
            .json({
              data: data,
              message: `Created`
            })
        }
      })
  }

  static index({query}, res) {
    let where = {};
    if (query && query.filter) {
      where = {title: new RegExp(query.filter, 'i')}
    }
    Article
      .find(where)
      .sort({created_at: -1})
      .populate('tags', '-_id')
      .populate('author', '-password')
      .then((props) => {
        res.json(props)
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: `Internal server error`
          })
      })
  }

  static read({params}, res) {
    Article
      .findBySlug(params.slug)
      .then((prop) => {
        if (!prop) {
          res
            .status(204)
            .send()
        }
        res
          .json(prop)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: `Internal server error`
          })
      })

  }

  static async update(req, res) {
    delete req.body['featured_image'];
    delete req.body['author'];
    delete req.body['slug'];
    req.body.tags = req.body.tags.split(',');

    if (req.body.tags.length && !(req.body.tags instanceof Array)) {
      req.body.tags = [req.body.tags];
    }

    if (req.body.tags && req.body.tags.length) {
      var tags = [];
      for (let i = 0; i < req.body.tags.length; i++) {
        let tag = req.body.tags[i];
        try {
          let slug = (slugify(tag) + '').toLowerCase();
          let dataTag = await Tag.findOneOrCreate({$or: [{name: tag}, {slug: slug}]}, {
            name: tag.replace(/[^\w\s\-]/gi, '').replace(/\s+/gi, ' '),
            slug: slug
          });
          tags.push(dataTag._id);
        } catch (e) {
          console.log(e, 'ini error for tags')
        }
      }
      req.body.tags = tags;
    }

    Article
      .findOne({
        _id: req.params.id,
        author: res.locals.user.id,
      })
      .then((article) => {
        if (!article) {
          res
            .status(204)
            .send()
        }
        if (req.file && req.file.cloudStoragePublicUrl) {
          if (article.featured_image) {
            let filename = article.featured_image.split('/');
            filename = filename[filename.length - 1];
            google.deleteFileInGCS(filename)
          }
          req.body.featured_image = req.file.cloudStoragePublicUrl;
        }
        Object.assign(article, req.body);
        return article.save()
      })
      .then((prop) => {
        res.json(prop)
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            message: `Internal server error`
          })
      })

  }

  static delete({params}, res, next) {
    Article
      .findOne({
        _id: params.id,
        author: res.locals.user.id
      })
      .then((article) => {
        if (!article) {
          res
            .status(204)
            .send()
        }
        if (article.featured_image) {
          let filename = article.featured_image.split('/');
          filename = filename[filename.length - 1];
          google.deleteFileInGCS(filename)
        }
        return article.remove()
      })
      .then((prop) => {
        res.json(prop)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: `Internal server error`
          })
      })
  }
}

module.exports = ArticleController;