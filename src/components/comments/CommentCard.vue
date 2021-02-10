<template>
  <div class="comment-card">
    <markdown-text :text="comment.body" />
    <div class="comment-owner">
      <owner-label
        :history="comment.history"
        :owner="comment.creator"
        :edit-path="`${comment.path('edit')}?redirect_to=${redirectTo}`"
        :reports="{ type: 'Comment', id: comment.id }"
        :delete-function="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import OwnerLabel from '@/components/users/OwnerLabel'
import CommentApi from '@/services/oblyk-api/CommentApi'
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'CommentCard',
  components: { MarkdownText, OwnerLabel },
  mixins: [SessionConcern],
  props: {
    comment: Object,
    getComments: Function
  },

  data () {
    return {
      redirectTo: this.$route.fullPath
    }
  },

  methods: {
    deleteComment: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        CommentApi
          .delete(this.comment.id)
          .then(() => {
            this.getComments()
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'comment')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-card {
  border-radius: 5px;
  padding: 10px;
}

.theme--light {
  .comment-card {
    background-color: #f5f5f5;
  }
}

.theme--dark {
  .comment-card {
    background-color: #121212;
  }
}
</style>
