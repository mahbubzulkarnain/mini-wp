Vue.component('article-read-view', {
  template: `
    <div class='container'>
        <div class="columns">
            <div class="column is-three-fifths is-offset-one-fifth">
                <article-item :post="post" :showauthor="true"></article-item>
            </div>
        </div>    
    </div>
  `,
  mounted() {
    if (this.params.length && this.params[0]) {
      api
        .get(`/${this.params.join('/')}`)
        .then(({data}) => {
          this.post = data;
          document.title = `${this.$root.webname} - ${data.title}`
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    document.title = `${this.$root.webname} - Read`;
  },
  data() {
    return {
      post: {
        _id: ``
      }
    }
  },
  props: {
    params: {
      required: true
    }
  }
});