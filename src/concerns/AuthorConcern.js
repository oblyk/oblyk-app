import Author from '@/models/Author'

export const AuthorConcern = {
  data () {
    return {
      author: null,
      loadingAuthor: true
    }
  },

  created () {
    if (this.$route.params.authorId) this.getAuthor()
  },

  methods: {
    getAuthor: function () {
      this.loadingAuthor = true
      new Author()
        .find(this.$route.params.authorId)
        .then(resp => {
          this.author = resp
        })
        .catch(err => {
          this.$root.$emit('authorFromApiError', err, 'author')
        })
        .finally(() => {
          this.loadingAuthor = false
        })
    }
  }
}
