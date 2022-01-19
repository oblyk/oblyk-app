import Comment from '@/models/Comment'

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
      new Comment({ axios: this.$axios, store: this.$store })
        ._find(this.$route.params.commentId)
        .then((resp) => {
          this.comment = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        }).finally(() => {
          this.loadingComment = false
        })
    }
  }
}
