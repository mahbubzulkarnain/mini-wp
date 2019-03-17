Vue.component('custom-navbar', {
  template: `
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation" :style="{'background-color': $root.bgNavbar}">
            <div class="navbar-brand">
                <a class="navbar-item" @click="$emit('to','home/articles')">
                    <h1 class="title">{{$root.webname}}</h1>
                </a>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" v-if="$root.isLogin">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <div v-if="page==='create'">
                                <a @click="$emit('create-article')" class="button is-primary">
                                    <strong>Publish</strong>
                                </a>
                            </div>
                            <div v-else-if="page==='edit'">
                                <a @click="$emit('update-article')" class="button is-primary">
                                    <strong>Update</strong>
                                </a>
                            </div>
                            <div v-else>
                                <a @click="$emit('to', 'create')" class="button is-primary">
                                    <strong>Create</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-item has-dropdown is-hoverable" v-if="false">
                        <a class="navbar-link is-arrowless">
                            <span class="icon"><i class="fa fa-bell"></i></span>
                        </a>
                        <div class="navbar-dropdown is-right">
                            <a class="navbar-item">
                                <strong>Administrator</strong> has comment at <strong>Lorem Ipsum</strong>
                            </a>
                        </div>
                    </div>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link image wrapper is-arrowless">
                            <img class="is-rounded avatar-nav" src="https://bulma.io/images/placeholders/128x128.png">
                        </a>

                        <div class="navbar-dropdown is-right">
                            <a class="navbar-item">
                                {{$root.fullname}}
                            </a>
                            <a class="navbar-item" v-if="false">
                                Setting
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item" @click="$emit('to','logout/articles')">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="navbarBasicExample" class="navbar-menu" v-else-if="$root.page !== 'login' && $root.page !== 'register'">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div><a class="button is-primary is-outlined" @click="$root.to('login')">Login</a></div>
                    </div>
                </div>
            </div>
            <div id="navbarBasicExample" class="navbar-menu" v-else>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div><a class="button is-danger is-outlined" @click="$root.to('home/articles')">Cancel</a></div>
                    </div>
                </div>
            </div>
        </nav>
  `,
  data() {
    return {
      bgNavbar: `transparent`
    }
  },
  props: ['page'],
});