Vue.component('article-list', {
  template: `
  <div>
    <div v-if="posts && posts.length">
        <div v-for="(post, i) in posts" class="columns is-multiline">
            <!--list-item-->
            <article-item
                    :post="limitPostTitleContent(post)">
            </article-item>
            <!--list-item-->
        </div>
    </div>
    <div v-else>
        <article-list-notfound></article-list-notfound>
    </div>
    <div class="columns is-multiline" v-if="false">
        <div class="column">
            <nav class="pagination is-centered" role="navigation"
                 aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 5">5</a></li>
                    <li><a class="pagination-link is-current" aria-label="Page 6"
                           aria-current="page">6</a>
                    </li>
                    <li><a class="pagination-link" aria-label="Goto page 7">7</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 8">8</a></li>
                </ul>
            </nav>
        </div>
    </div>
  </div>
  `,
  props: ['posts'],
  methods: {
    limitPostTitleContent: function (input) {
      if (input.title.length > 50) {
        input.title = input.title.substr(0, 50) + '...';
      }
      if (marked(input.content).length > 300) {
        input.content = marked(input.content).substr(0, 300) + '...';
      }
      return input;
    },
    deleteArticle: function (index) {
      api
        .delete('/' + this.selected)
        .then(({data}) => {
          if (this.page === 'list') {
            this.published.splice(index, 1);
          }
          this.page = 'list';
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateArticle: function () {
      this.content = this.$refs.editorContent.api.origElements.innerHTML;
      if (this.content.length > 0 && this.title.length > 0) {
        api
          .put('/' + this.selected, {
            title: this.title,
            content: this.content,
            created_at: new Date()
          })
          .then(({data}) => {
            this.title = '';
            this.content = '';
            this.page = 'read';
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    createArticle: function () {
      this.content = this.$refs.editorContent.api.origElements.innerHTML;
      if (this.content.length > 0 && this.title.length > 0) {
        api
          .post('/', {
            title: this.title,
            content: this.content,
            created_at: new Date()
          })
          .then(({data}) => {
            this.title = '';
            this.content = '';
            this.page = 'read';
            this.selected = data.data._id;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    filterList: function () {
      api
        .get('/', {
          params: {
            filter: this.filterKey
          }
        })
        .then(({data}) => {
          this.published = data;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
});