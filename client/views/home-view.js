Vue.component('home-view', {
  template: `
    <div class="container">
      <div class="columns">
          <div class="column is-three-fifths is-offset-one-fifth">
              <div class="field">
                  <div class="control">
                      <input class="input" v-model="filterKey" @keyup.enter="filterList"
                             placeholder="Search...">
                  </div>
              </div>
              <article-list :posts="published"></article-list>
          </div>
      </div>
  </div>  
  `,
  data() {
    return {
      filterKey: '',
      drafted: [],
      published: [],
    }
  },
  methods: {
    filterList: function () {
      this.fetchData();
    },
    fetchData: function () {
      let query = {};
      if (this.filterKey && this.filterKey.length > 0) {
        query = {
          params: {
            filter: this.filterKey
          }
        }
      }
      api
        .get('/' + this.params.join('/'), query)
        .then(({data}) => {
          this.published = data;
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },
  created() {
    document.title = `${this.$root.webname} - Home`
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    params: function (newParams, oldParams) {
      this.fetchData()
    }
  },
  props: ['page', 'params']
});