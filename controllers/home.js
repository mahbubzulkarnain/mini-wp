const Article = require('../models/article/Index');

class HomeController {
  static create(req, res) {
    const {body} = req;
    (new Article({
      title: body.title,
      content: body.content
    })).save((err, data) => {
      if (err) {
        console.error(err);
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

  static read({params}, res, next) {
    Article
      .findById(params.id)
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

  static update({params, body}, res, next) {
    Article
      .findById(params.id)
      .then((article) => {
        if (!article) {
          throw Article().invalidate('article', 'Not found', '')
        }
        Object.assign(article, body);
        return article.save()
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

  static delete({params}, res, next) {
    Article
      .findById(params.id)
      .then((article) => {
        if (!article) {
          throw Article().invalidate('article', 'Not found', '')
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

module.exports = HomeController;