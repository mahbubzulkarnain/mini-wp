Vue.component('login-view', {
  template: `
    <div class='container'>
        <div class="columns is-vcentered">
            <form class="column is-two-fifths is-offset-1" @submit.prevent="postLogin">
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">Username/Email</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="Username/Email" class="input" v-model="user" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">Password</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="password" placeholder="Password" class="input" autocomplete="off" v-model="password" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="button is-primary is-fullwidth" type="submit" value="Login">
                    </div>
                </div>
                <hr>
                <div class="field">
                    <div class="control">
                        <div id="google-signin-button" class="button is-danger is-outlined is-fullwidth" :data-onsuccess="$root.signIn">
                            <div class="buttonText">Login with google</div>
                        </div>
                    </div>
                </div>
            </form>
            <section class="column is-two-fifths is-offset-1 hero is-fullheight">
                <div class="hero-body">
                    <a class="button is-primary is-outlined is-fullwidth" @click="to('register')">Register With Email</a>
                </div>            
            </section>
        </div>
    </div>
  `,
  data() {
    return {
      user: this.$root.email || ``,
      password: ``,
    }
  },
  mounted() {
    gapi.load('auth2', () => {
      auth2 = gapi.auth2.init({
        client_id: '577955257208-bnmka8aiqq9ho0qivjuadqm529ege0aj.apps.googleusercontent.com',
      });
      this.$root.attachSignin(document.getElementById('google-signin-button'))
    });
  },
  methods: {
    postLogin: function () {
      api
        .post('/auth/login', {
          user: this.user,
          password: this.password
        })
        .then(({data}) => {
          this.$root.isLogin = true;
          localStorage.setItem('xf', data.fullname);
          localStorage.setItem('xu', data.username);
          localStorage.setItem('xi', data.id);
          localStorage.setItem('xs', data.token);
          this.$root.to('/home/articles')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    to: function (page) {
      this.$root.to(page)
    }
  }
});