const router = require('express')
  .Router()
const Home = require('./controllers/home')

router
  .get('/create', Home.create)
  .get('/read', Home.read)
  .get('/list', Home.list)
  .get('/', Home.index)

module.exports = router