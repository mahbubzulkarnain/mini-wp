Vue.component('register-view', {
  template: `
    <div class='container'>
        <div class="columns is-vcentered">
            <form class="column is-two-fifths is-offset-1" @submit.prevent="postRegister">
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">First name</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="First name" class="input" v-model="first_name" required>
                                <p class="help is-danger" v-if="error['first_name']">{{error['first_name'].message}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">Last name</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="Last name" class="input" v-model="last_name" required>
                            </div>
                            <p class="help is-danger" v-if="error['last_name']">{{error['last_name'].message}}</p>
                        </div>
                    </div>
                </div><br>
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">Email</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="Email" class="input" v-model="email" required>
                            </div>
                            <p class="help is-danger" v-if="error['email']">{{error['email'].message}}</p>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="field-label is-normal has-text-left	">
                        <label class="label">Username</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="Username" class="input" v-model="username" required>
                            </div>
                            <p class="help is-danger" v-if="error['username']">{{error['username'].message}}</p>
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
                        <input class="button is-primary is-fullwidth" type="submit" value="Register">
                    </div>
                </div>
                <hr>
                <div class="field">
                    <div class="control">
                        <div id="google-signin-button" class="button is-danger is-outlined is-fullwidth" :data-onsuccess="$root.signIn">
                            <div class="buttonText">Register with google</div>
                        </div>
                    </div>
                </div>
            </form>
            <section class="column is-two-fifths is-offset-1 hero is-fullheight">
                <div class="hero-body">
                    <a class="button is-primary is-outlined is-fullwidth" @click="to('login')">Login With Email</a>  
                </div>          
            </section>
        </div>
    </div>
  `,
  data() {
    return {
      first_name: ``,
      last_name: ``,
      username: ``,
      email: ``,
      password: ``,
      error: ``
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
    postRegister: function () {
      this.error = ``;
      api
        .post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(({data}) => {
          console.log(data);
          this.$root.email = data.email;
          console.log(this.$root.email);
          this.to('login/articles');
        })
        .catch((err) => {
          try {
            const {message} = err.response.data;
            this.error = message.errors;
          } catch (e) {

          }
        })
    },
    to: function (page) {
      this.$root.to(page)
    }
  }
});