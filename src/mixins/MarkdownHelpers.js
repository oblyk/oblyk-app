import DOMPurify from 'dompurify'
import marked from 'marked'

export const MarkdownHelpers = {
  methods: {
    purify: function (text) {
      return DOMPurify.sanitize(text)
    },

    marked: function (text) {
      return marked(this.purify(text), { breaks: true })
    }
  }
}
