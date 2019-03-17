Vue.component('article-list', {
  template: `
  <>
    <div v-if="posts.length">
      <div class="columns is-multiline" v-for="(post, i) in posts" :key="i">
        <a @click="$emit('readList', post._id)" class="column is-full">
          <article-item :post="post"/>
        </a>
      </div>
    </div>
    <div v-else>
      <div class="columns is-multiline">
          <div class="column is-full" style="margin-bottom: 10px;">Not found</div>
      </div>
    </div>
    <div class="columns is-multiline">
        <div class="column">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
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
  </>
  `,
  props: {},
});