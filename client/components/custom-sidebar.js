Vue.component('custom-sidebar', {
  template: `
      <aside>
          <ul class="menu-list">
              <li><a @click="$emit('to','create')" :class="[(page === 'create' ? 'is-active' : '')]">Create</a>
              </li>
              <li><a @click="$emit('to', 'list')" :class="[(page === 'list' ? 'is-active' : '')]">List</a></li>
          </ul>
      </aside>
`,
  props: ['page']
});