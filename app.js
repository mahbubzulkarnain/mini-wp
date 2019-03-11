const express = require('express')
const app = express()

const path = require('path')

app
  .locals.webname = 'Hacktivy'

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .use('/editor', express.static(path.join(__dirname + '/node_modules/medium-editor/dist')))
  .use('/editor/md', express.static(path.join(__dirname + '/node_modules/medium-editor-markdown/dist')))

app
  .use('/', require('./components/home'))

app
  .use(function (err, req, res, next) {
    if (err && err instanceof String) {
      err = newError(err)
    }
    res
      .status(res.statusCode === 200 ? 500 : res.statusCode)
      .json({ message: err.message })
  })
  .listen(+(process.env.PORT || 3000))
