<template>
  <div
    class="rounded-sm pa-2"
    :class="isMainReply ? 'sheet-background-color' : ' back-app-color'"
  >
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
        <v-btn
          v-if="isMainComment || isMainReply"
          v-model="showReply"
          text
          :icon="!isMainComment"
          @click="openReplyForm"
        >
          <span v-if="isMainComment">
            {{ $t('actions.reply') }}
          </span>
          <v-icon :right="isMainComment">
            {{ showReply ? mdiClose : mdiReply }}
          </v-icon>
        </v-btn>
        <like-btn
          class="align-end"
          :initial-like-count="comment.likes_count"
          :likeable-id="comment.id"
          likeable-type="Comment"
        />
      </div>
    </div>

    <div v-if="isMainComment || isMainReply">
      <!-- Reply comments list -->
      <div class="comments-reply-card">
        <comment-card
          v-for="(replyComment, commentIndex) in comments"
          :key="`comment-index${commentIndex}`"
          :comment="replyComment"
          class="mt-2"
        />
      </div>

      <!-- Load more reply comments -->
      <div
        v-if="comment.comments_count && comment.comments_count - comments.length > 0 && !noMoreReplyComments && !loadingComments"
      >
        <v-btn
          small
          text
          @click="getReplyComments"
        >
          {{ $tc('components.comment.seeReplies', comment.comments_count - comments.length, { count: comment.comments_count - comments.length }) }}
        </v-btn>
      </div>

      <!-- Reply form -->
      <v-text-field
        v-if="showReply"
        ref="replyTextField"
        v-model="replyData.body"
        class="mt-2"
        :loading="loadingReply"
        rows="1"
        dense
        outlined
        :append-icon="mdiSend"
        @click:append="sendReply"
      />

      <!-- Loading comment -->
      <div v-if="loadingComments" class="text-center">
        <v-progress-circular indeterminate />
      </div>
    </div>
  </div>
</template>

<script>
import { mdiReply, mdiSend, mdiClose } from '@mdi/js'
import OwnerLabel from '@/components/users/OwnerLabel'
import CommentApi from '~/services/oblyk-api/CommentApi'
import LikeBtn from '~/components/forms/LikeBtn'
import Comment from '~/models/Comment'
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
      redirectTo: this.$route.fullPath,
      showReply: false,
      loadingReply: false,
      comments: [],
      loadingComments: false,
      replyCommentsPage: 1,
      noMoreReplyComments: false,
      replyData: {
        body: null,
        commentable_type: 'Comment',
        commentable_id: this.comment.id,
        reply_to_comment_id: null
      },

      mdiReply,
      mdiSend,
      mdiClose
    }
  },

  computed: {
    isMainComment () {
      return this.comment.commentable_type !== 'Comment'
    },

    isMainReply () {
      return this.comment.commentable_type === 'Comment' && this.comment.reply_to_comment_id === null
    },

    isSecondaryReply () {
      return this.comment.commentable_type === 'Comment' && this.comment.reply_to_comment_id !== null
    }
  },

  methods: {
    openReplyForm () {
      if (this.showReply) {
        this.showReply = false
      } else {
        this.showReply = true
        setTimeout(() => {
          this.$refs.replyTextField.focus()
          this.$refs.replyTextField.$el.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 500)
      }
    },

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
    },

    sendReply () {
      this.loadingReply = true
      if (this.comment.commentable_type === 'Comment') {
        this.replyData.reply_to_comment_id = this.comment.commentable_id
      }
      new CommentApi(this.$axios, this.$auth)
        .create(this.replyData)
        .then((resp) => {
          this.comments.push(new Comment({ attributes: resp.data }))
        })
        .finally(() => {
          this.showReply = false
          this.loadingReply = false
        })
    },

    getReplyComments () {
      this.loadingComments = true
      new CommentApi(this.$axios, this.$auth)
        .comments(this.comment.id, this.replyCommentsPage)
        .then((resp) => {
          if (resp.data.length < 5) {
            this.noMoreReplyComments = true
          }
          const commentIds = this.comments.map(comment => comment.id)
          for (const comment of resp.data) {
            if (!commentIds.includes(comment.id)) {
              this.comments.push(new Comment({ attributes: comment }))
            }
          }
        })
        .finally(() => {
          this.replyCommentsPage += 1
          this.loadingComments = false
        })
    }
  }
}
</script>
