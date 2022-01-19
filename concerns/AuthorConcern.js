import Author from '@/models/Author'

export const AuthorConcern = {
  data () {
    return {
      author: null,
      loadingAuthor: true
    }
  },

  created () {
    if (this.$route.params.authorId) { this.getAuthor() }
  },

  methods: {
    getAuthor () {
      this.loadingAuthor = true
      new Author({ axios: this.$axios, store: this.$store })
        ._find(this.$route.params.authorId)
        .then((resp) => {
          this.author = resp
        })
        .catch((err) => {
          this.$root.$emit('authorFromApiError', err, 'author')
        })
        .finally(() => {
          this.loadingAuthor = false
        })
    }
  }
}
