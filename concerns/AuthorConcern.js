import OblykApi from '~/services/oblyk-api/OblykApi'

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
      new OblykApi(this.$axios, this.$auth)
        .get(`/authors/${this.$route.params.authorId}`)
        .then((resp) => {
          this.author = resp.data
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
