<template>
  <div class="comment-card">
    <div class="comment-message" v-html="comment.body"></div>
    <div class="comment-owner">
      <owner-label
        :history="comment.history"
        :owner="comment.creator"
        :edit-path="`${comment.url('edit')}?redirect_to=${redirectTo}`"
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

export default {
  name: 'CommentCard',
  components: { OwnerLabel },
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

  .comment-message {}
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
