if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();

const path = require('path');
const jwt = require('./middlewares/jwt');

require('mongoose')
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then((prop) => {
    console.log(`${process.env.DATABASE_URL} => ${prop.connection.name} connected, port ${prop.connection.port}.`)
  })
  .catch((err) => {
    console.error(err)
  });

app
  .locals.webname = 'MiniWP';

app
  .use(require('cors')())
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .use('/editor', express.static(path.join(__dirname + '/node_modules/medium-editor/dist')))
  .use('/editor/md', express.static(path.join(__dirname + '/node_modules/medium-editor-markdown/dist')))
  .use(function (req, res, next) {
    console.log(`${req.protocol + '://' + req.get('host') + (req.originalUrl ? req.originalUrl : req.url)} connected, port ${process.env.PORT || 3000}.`);
    next()
  });

app
  .use('/api/auth/', require('./routes/auth'))
  .use('/api/user/', jwt, require('./routes/user'))
  .use('/api/articles/', require('./routes/article'))
  .use('/api/tags/', require('./routes/tag'));

app
  .use(function (err, req, res, next) {
    if (err && err instanceof String) {
      err = newError(err)
    }
    res
      .status(res.statusCode === 200 ? 500 : res.statusCode)
      .json({message: err.message})
  })
  .listen(+(process.env.PORT || 3000));
