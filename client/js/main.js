const baseURL = "http://miniwp-server.cloudeyeglobal.com";

var headers = {};

if (localStorage.xs) {
  headers = {
    headers: {
      authorization: 'Bearer ' + localStorage.xs
    }
  }
}

var api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 3000,
  ...headers
});

$(function () {
  new Vue({
    el: "#app",
    data: {
      webname: `Mini WP`,
      websubtitle: ``,
      email: ``,
      marginTop: 0,
      page: '',
      params: [],
      drafted: [],
      published: [],
      fullname: `Profile`,
      username: ``,
      xi: ``,
      newarticle: {
        file: ``,
        title: ``,
        content: ``,
        tags: '',
      },
      isLogin: false,
    },
    beforeUpdate() {
      if (localStorage.xf) {
        this.fullname = localStorage.xf;
      }

      if (localStorage.xu) {
        this.username = localStorage.xu;
      }

      if (this.page === 'edit' && !this.newarticle.title) {
        this.page = 'create';
      }

      headers = {};
      if (localStorage.xs && localStorage.xi) {
        headers = {
          headers: {
            authorization: 'Bearer ' + localStorage.xs
          }
        }
      }
      api = axios.create({
        baseURL: `${baseURL}/api`,
        timeout: 3000,
        ...headers
      });
    },
    methods: {
      /**
       * HELPERS
       */
      to: function (page) {
        let urlParsed = page.replace(/^\//g, '').split('/');
        this.page = urlParsed[0];
        this.params = urlParsed.slice(1);
      },
      /**
       * ARTICLE
       */
      isAuthor: function (id) {
        if (localStorage.xi && id) {
          return localStorage.xi === id;
        } else {
          return false;
        }
      },
      updateArticle: function () {
        if (this.newarticle.title.length > 0 && this.newarticle.content.length > 0 && this.newarticle._id) {
          this.newarticle.tags = ($('#tags').tokenfield('getTokensList')).split(',');
          let dataUpload = this.newarticle;

          var formData = new FormData();
          var dataFile = document.querySelector('#file');
          formData.append("title", dataUpload.title);
          formData.append("content", dataUpload.content);
          formData.append("tags", dataUpload.tags);
          formData.append("file", dataFile.files[0]);
          api
            .put(`/articles/${dataUpload._id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(({data}) => {
              this.to('/home/articles')
            })
            .catch((err) => {
              this.newarticle = dataUpload;
              console.log(err.response.data)
            })

        }
      },
      createArticle: function () {

        if (this.newarticle.title.length > 0 && this.newarticle.content.length > 0) {
          this.newarticle.tags = ($('#tags').tokenfield('getTokensList')).split(',');
          let dataUpload = this.newarticle;

          var formData = new FormData();
          var dataFile = document.querySelector('#file');
          formData.append("title", dataUpload.title);
          formData.append("content", dataUpload.content);
          formData.append("tags", dataUpload.tags);
          formData.append("file", dataFile.files[0]);
          api
            .post('/articles', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(({data}) => {
              this.to('/home/articles')
            })
            .catch((err) => {
              this.newarticle = dataUpload;
              console.log(err.response.data)
            })
        }
      },
      /**
       * AUTH
       */
      checkLogin: function checkLogin(id_token) {
        api
          .post('/auth/google', {
            id_token: id_token
          })
          .then(({data}) => {
            this.isLogin = true;
            localStorage.setItem('xf', data.fullname);
            localStorage.setItem('xu', data.username);
            localStorage.setItem('xi', data.id);
            localStorage.setItem('xs', data.token);
            this.to('/home/articles')
          })
          .catch(() => {

          })
      },
      attachSignin: function (element) {
        auth2.attachClickHandler(element, {},
          this.signIn, function (error) {
            console.log(error)
          })
      },
      signIn: function (googleUser) {
        const {id_token} = googleUser.getAuthResponse();
        this.checkLogin(id_token)
      },
      signOut: function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
          .then(function () {
            localStorage.clear();
            isNotLogin()
          })
      }
    },
    created() {
      if (localStorage.xf) {
        this.fullname = localStorage.xf;
      }

      if (localStorage.xu) {
        this.username = localStorage.xu;
      }

      document.title = this.webname;
      if (localStorage.xs) {
        this.isLogin = true
      }

      if (sessionStorage.page) {
        this.page = sessionStorage.page;
      } else {
        this.page = 'home';
      }
      if (sessionStorage.params) {
        this.params = JSON.parse(sessionStorage.params);
      } else {
        this.params = ['articles'];
      }

      if (!this.isLogin && (this.page === 'create' || this.page === 'edit')) {
        this.page = 'home';
        this.params = ['articles'];
      }
    },
    watch: {
      page: function (newPage, oldPage) {
        if (newPage !== 'login' || newPage !== 'register') {
          this.marginTop = '60px';
          this.bgNavbar = 'white';
        } else {
          this.marginTop = '0';
          this.bgNavbar = 'transparent';
        }

        sessionStorage.setItem('page', this.page);
        sessionStorage.setItem('params', JSON.stringify(this.params));

        if (newPage === 'logout') {
          sessionStorage.clear();
          localStorage.clear();
          this.isLogin = false;
          this.to('/login/articles');
        }
      },
    }
  });
});

Vue.component('medium-content', vueMediumEditor.default);