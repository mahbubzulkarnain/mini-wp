class HomeController {
  static index(req, res) {
    res.render('pages/home')
    // res.sendFile('index.html');
  }

  static create(req, res) {
    res.render('pages/create')
  }

  static list(req, res) {
    res.render('pages/list')
  }

  static read({params}, res) {
    res.render('pages/read', {id: params.id})
  }

  static edit({params}, res) {
    res.render('pages/edit', {id: params.id})
  }
}

module.exports = HomeController;