<template>
  <div class="back-app-color rounded-sm pa-2">
    <markdown-text
      v-if="comment.body"
      :text="comment.body"
    />
    <div class="comment-owner d-flex justify-space-between">
      <owner-label
        :history="comment.history"
        :owner="comment.creator"
        :edit-path="`${comment.path}/edit?redirect_to=${redirectTo}`"
        :reports="{ type: 'Comment', id: comment.id }"
        :delete-function="deleteComment"
      />
      <div>
        <like-btn
          class="align-end"
          :initial-like-count="comment.likes_count"
          :likeable-id="comment.id"
          likeable-type="Comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OwnerLabel from '@/components/users/OwnerLabel'
import CommentApi from '~/services/oblyk-api/CommentApi'
import LikeBtn from '~/components/forms/LikeBtn'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'CommentCard',
  components: { LikeBtn, MarkdownText, OwnerLabel },
  props: {
    comment: {
      type: Object,
      required: true
    },
    getComments: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      redirectTo: this.$route.fullPath
    }
  },

  methods: {
    deleteComment () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new CommentApi(this.$axios, this.$auth)
          .delete(this.comment.id)
          .then(() => {
            this.getComments()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'comment')
          })
      }
    }
  }
}
</script>
