class HomeController {
  static index(req, res) {
    res.render('pages/home')
  }

  static create(req, res) {
    res.render('pages/create')
  }

  static list(req, res) {
    res.render('pages/list')
  }

  static read(req, res) {
    res.render('pages/read')
  }
}

module.exports = HomeController