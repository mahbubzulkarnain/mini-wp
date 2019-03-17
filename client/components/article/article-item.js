Vue.component('article-item', {
  template: `
  <div class="column is-full">
    <div class="card mb-medium">
        <div class="card-image" @click="to('/article/articles/'+post.slug)">
            <figure class="image is-4by3">
              <img :src="post.featured_image || 'https://bulma.io/images/placeholders/1280x960.png'" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="tags are-medium is-pulled-right">
                <span class="tag is-size-7">{{timeAgo(post.created_at)}} day ago</span>
            </div>
           <div @click="to('/article/articles/'+post.slug)" class="content">
                <p class="title">{{post.title}}</p>
                <p v-html="marked(post.content || '')"></p>
            </div>
            <div class="content">
                <div class="tags are-medium is-pulled-right" v-if="$root.isLogin && $root.isAuthor((post && post.author ? post.author._id : ''))">
                    <a @click="toEdit(post.slug)"
                       class="tag is-info is-size-6">Edit</a>
                    <a @click="deleteArticle(post._id)"
                       class="tag is-danger is-size-6">Delete</a>
                </div>
                <div class="tags" v-if="post.tags && post.tags.length">
                    <a class="tag" v-for="tag in post.tags" @click="to('/home/tags/'+tag.slug+'/articles')">{{tag.name}}</a>
                </div>
            </div>
        </div>
        <div class="card-content" v-if="showauthor">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{(post && post.author ? post.author.first_name + ' ' +post.author.last_name : '' )}}</p>
                    <p class="subtitle is-6">{{ post && post.author ? '@' + post.author.username : ''}}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
  `,
  props: {
    post: {
      default: {
        _id: ``
      }
    },
    showauthor: {
      default: false
    }
  },
  methods: {
    to: function (slug) {
      this.$root.to(slug);
    },
    toEdit: function (slug) {
      api
        .get(`/articles/${slug}`)
        .then(({data}) => {
          if (data && data.tags.length) {
            var newtag = [];
            data.tags.map((item) => {
              newtag.push(item.name)
            });
            data.tags = newtag;
          }
          this.$root.newarticle = data;
          this.to('edit/articles')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteArticle(id, index) {
      api
        .delete(`/articles/${id}`)
        .then(({data}) => {
          if (this.$root.page === 'article') {
            this.$root.to('home/articles')
          } else {
            this.$root.to([this.$root.page].concat(this.$root.params).join('/'));
          }
        })
        .catch((err) => {
          console.error(err)
        });
    },
    timeAgo: function (second) {
      let seconds = Math.floor((new Date(Date.now()) - new Date(second || Date.now())) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        return interval + " tahun yang lalu";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " bulan yang lalu";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " hari yang lalu";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " jam yang lalu";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " menit yang lalu";
      }
      if (!!!+seconds || seconds < 30) {
        return "beberapa saat yang lalu";
      }
      return Math.floor(seconds) + " detik yang lalu";
    },
  }
});

Vue.mixin({
  methods: {
    marked: function (input) {
      return marked(input)
    }
  }
});