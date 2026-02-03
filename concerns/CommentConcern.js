import OblykApi from '~/services/oblyk-api/OblykApi'

export const CommentConcern = {
  data () {
    return {
      comment: null,
      loadingComment: true
    }
  },

  created () {
    if (this.$route.params.commentId) { this.getComment() }
  },

  methods: {
    getComment () {
      this.loadingComment = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/comments/${this.$route.params.commentId}`)
        .then((resp) => {
          this.comment = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        }).finally(() => {
          this.loadingComment = false
        })
    }
  }
}
