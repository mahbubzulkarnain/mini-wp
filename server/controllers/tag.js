const Article = require('../models/article/index');
const Tag = require('../models/tag/index');

class TagController {
  static create({body}, res) {
    delete body['_id'];
    (new Tag(body)).save((err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json(err.message)
      } else {
        res
          .json(data)
      }
    })
  }

  static list({query}, res) {
    Tag
      .find({})
      .then((props) => {
        res
          .json(props)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }

  static read({params}, res) {
    Tag
      .findOne({
        slug: params.slug
      })
      .then((prop) => {
        res
          .json(prop)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }

  static readWithArticles({params, query}, res) {
    Tag
      .findOneBySlugWithArticles(params.slug)
      .then((props) => {
        if (props && query && query.filter) {
          props = props.filter(function (item) {
            return item.title.match(new RegExp(query.filter, 'i'))
          });
          console.log(props);
        }

        res
          .json(props)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }

  static update({params, body}, res) {
    Tag
      .findBySlug(params.slug)
      .then((tag) => {
        if (!tag) {
          throw new Tag().invalidate('Tag', 'Not found', '')
        }
        Object.assign(tag, body);
        return tag.save()
      })
      .then((prop) => {
        res
          .json(prop)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }

  static delete({params}, res) {
    Tag
      .findBySlug(params.slug)
      .then((tag) => {
        if (!tag) {
          throw new Tag().invalidate('Tag', 'Not found', '')
        }
        return tag.remove();
      })
      .then((prop) => {
        res
          .json(prop)
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: err.message
          })
      })
  }
}

module.exports = TagController;