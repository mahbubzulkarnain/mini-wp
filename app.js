if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();

const path = require('path');

require('mongoose')
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then((prop) => {
    console.log(`${prop.connection.name} connected, port ${prop.connection.port}.`)
  })
  .catch((err) => {
    console.error(err)
  });

app
  .use(require('morgan')('dev'));

app
  .locals.webname = 'Hacktivy';

app
  .use(function (req, res, next) {
    res.locals.rootdir =
      next();
  })

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .use('/editor', express.static(path.join(__dirname + '/node_modules/medium-editor/dist')))
  .use('/editor/md', express.static(path.join(__dirname + '/node_modules/medium-editor-markdown/dist')));

app
  .use('/api/', require('./routes/index'));

app
  .use('/', require('./components/home/web'));

console.log(process.env.PORT || 3000);

app
  .use(function (err, req, res, next) {
    if (err && err instanceof String) {
      err = newError(err)
    }
    res
      .status(res.statusCode === 200 ? 500 : res.statusCode)
      .json({message: err.message})
  })
  .listen(+(3000));
