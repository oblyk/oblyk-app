<template>
  <div>
    <spinner v-if="loadingComments" :full-height="false" />

    <!-- Comment list -->
    <div v-else>
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="mt-3"
      >
        <comment-card
          :get-comments="getComments"
          :comment="comment"
        />
      </div>

      <!-- No comment -->
      <p
        v-if="comments.length === 0"
        class="text--disabled text-center"
        v-bind:class="mTopNoComment"
      >
        {{ $t('components.comment.noComment') }}
      </p>
    </div>

    <!-- Add comment-->
    <div
      v-if="isLoggedIn"
      class="text-right mt-4"
    >
      <v-btn
        :to="`/comments/${commentableType}/${commentableId}/new?redirect_to=${redirectTo}`"
        text
        small
        color="primary"
      >
        <v-icon left small>mdi-comment-plus</v-icon>
        {{ $t('actions.addComment') }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import CommentApi from '@/services/oblyk-api/CommentApi'
import Comment from '@/models/Comment'
import CommentCard from '@/components/comments/CommentCard'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CommentList',
  components: { CommentCard, Spinner },
  mixins: [SessionConcern],
  props: {
    commentableId: [String, Number],
    commentableType: String,
    mTopNoComment: {
      type: String,
      default: 'mt-10'
    }
  },

  data () {
    return {
      comments: [],
      loadingComments: true,
      redirectTo: this.$route.fullPath
    }
  },

  mounted () {
    this.getComments()
  },

  methods: {
    getComments: function () {
      this.loadingComments = true
      CommentApi
        .allInCommentable(this.commentableType, this.commentableId)
        .then(resp => {
          this.comments = []
          for (const comment of resp.data) {
            this.comments.push(new Comment(comment))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        })
        .then(() => {
          this.loadingComments = false
        })
    }
  }
}
</script>
