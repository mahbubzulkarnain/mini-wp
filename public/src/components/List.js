Vue.component('list-item', {
  template: `
  <div class="column is-full">
    <div class="card mb-medium">
        <div class="card-content">
            <!--<div class="tags are-medium is-pulled-right">
            <span class="tag is-size-7">{{i + 1}} day ago</span>-->
            <!--</div>-->
            <div class="content">
                <div class="title" v-html="marked(post.title)"/>
                <p v-html="marked(post.content)"></p>
            </div>
            <!--<div class="content">-->
                <!--<div class="media">-->
                    <!--<div class="media-left">-->
                        <!--<div class="image is-48x48">-->
                            <!--<img class="is-rounded"-->
                                 <!--src="https://bulma.io/images/placeholders/96x96.png"-->
                                 <!--alt="Placeholder image">-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="media-content">-->
                        <!--<p class="title is-5">{{post.owner.name}}</p>-->
                        <!--<p class="subtitle is-6">{{post.owner.username}}</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="content">
                <div class="tags are-medium is-pulled-right">
                    <a :href="'/edit/'+post._id"  class="tag is-info is-size-6">Edit</a>
                    <a :href="'/delete/'+post._id" class="tag is-danger is-size-6">Delete</a>
                </div>
                <div class="tags"><span class="tag">One</span><span
                            class="tag">Two</span><span
                            class="tag">Three</span><span class="tag">Four</span><span
                            class="tag">Five</span><span
                            class="tag">Six</span><span class="tag">Seven</span><span
                            class="tag">Eight</span>
                </div>
            </div>
        </div>
    </div>
  </div>
  `,
  props: {
    post: {
      required: true
    }
  }
});

Vue.component('list', {
  template: `
<>
  <div v-if="posts.length">
    <div class="columns is-multiline" v-for="(post, i) in posts" :key="i">
      <a @click="readList(post._id)" class="column is-full">
        <list-item :post="post"/>
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
  props: {
    posts: {
      required: true
    },
    id:''
  },
});