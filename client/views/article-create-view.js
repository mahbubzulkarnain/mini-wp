Vue.component('article-create-view', {
  template: `
    <div class='container'>
        <form enctype="multipart/form-data" @submit.prevent="$root.createArticle">
            <div class="field">
                <div class="control">
                    <input class="file" type="file" id="file">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input :value="value.title" @input="updateValue()" ref="title" class="input" placeholder="Type your title">
                </div>
            </div>
            <hr>
            <div class="field">
                <div class="control">
                    <input :value="value.tags" @input="updateValue()" ref="tags" id='tags' class="input" placeholder="Type your tags" style="font-size: 15px;">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <medium-content
                        id="editorContent"
                        ref='editorContent'
                        @edit="processEditOperation"
                        :text='value.content'
                        custom-tag='div'
                        data-placeholder="Type your content"
                        :options="option"
                        autofocus
                    ></medium-content>
                </div>
            </div>
        </form>    
    </div>
  `,
  mounted() {
    $("#tags").tokenfield();
  },
  data() {
    return {
      option: {
        paste: {
          forcePlainText: true,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
        }
      }
    }
  },
  methods: {
    processEditOperation: function (operation) {
      this.$root.newarticle.content = operation.event.srcElement.innerHTML
    },
    updateValue() {
      this.$root.newarticle.title = this.$refs.title.value;
      this.$root.newarticle.tags = $('#tags').tokenfield('getTokensList');
    }
  },
  props: ['value']
});