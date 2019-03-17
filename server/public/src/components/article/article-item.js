Vue.component('article-item', {
  template: `
  <div class="column is-full">
      <div class="card mb-medium">
          <div class="card-content">
              <div class="tags are-medium is-pulled-right">
                  <span class="tag is-size-7">{{timeAgo(post.created_at)}} day ago</span>
              </div>
              <div @click="page='read', selected=post._id"
                   class="content">
                  <p class="title">{{post.title}}</p>
                  <p v-html="marked(post.content || '')"></p>
              </div>
              <div class="content">
                  <div class="tags are-medium is-pulled-right">
                      <a @click="page='edit', selected=post._id"
                         class="tag is-info is-size-6">Edit</a>
                      <a @click="selected=post._id, $emit('deleteArticle', (i)"
                         class="tag is-danger is-size-6">Delete</a>
                  </div>
                  <div class="tags">
                      <span class="tag">One</span>
                      <span class="tag">Two</span>
                      <span class="tag">Three</span>
                      <span class="tag">Four</span>
                      <span class="tag">Five</span>
                      <span class="tag">Six</span>
                      <span class="tag">Seven</span>
                      <span class="tag">Eight</span>
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