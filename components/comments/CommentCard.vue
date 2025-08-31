<template>
  <div
    class="pa-2"
    :class="!isMainComment ? 'border-left pl-5 py-0' : null"
  >
    <owner-label
      :history="dataComment.history"
      :owner="dataComment.creator"
      :edit-path="`${dataComment.path}/edit?redirect_to=${redirectTo}`"
      :reports="{ type: 'Comment', id: dataComment.id }"
      :delete-function="deleteComment"
    />
    <markdown-text
      v-if="dataComment.body && !dataComment.moderated"
      :text="dataComment.body"
    />
    <p
      v-if="dataComment.moderated"
      class="text-center text--disabled my-3"
    >
      {{ $t('components.comment.moderate') }}
    </p>
    <v-chip
      v-if="newComment"
      color="red"
      dark
      x-small
    >
      New
    </v-chip>
    <client-only>
      <div class="d-flex align-center">
        <div
          v-if="dataComment.comments_count && dataComment.comments_count - comments.length > 0 && !noMoreReplyComments && !loadingComments"
        >
          <v-chip
            text
            outlined
            small
            @click="getReplyComments"
          >
            {{ $tc('components.comment.seeReplies', dataComment.comments_count, { count: dataComment.comments_count - comments.length }) }}
          </v-chip>
        </div>
        <div class="ml-auto">
          <v-btn
            v-if="moderable && !dataComment.moderated"
            text
            outlined
            small
            color="red"
            :loading="loadingModerate"
            @click="moderate()"
          >
            {{ $t('actions.delete') }}
          </v-btn>
          <v-btn
            v-if="$auth.loggedIn && (isMainComment || isMainReply) && !dataComment.moderated"
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
            v-if="!dataComment.moderated"
            class="align-end"
            :initial-like-count="dataComment.likes_count"
            :likeable-id="dataComment.id"
            likeable-type="Comment"
          />
        </div>
      </div>
    </client-only>

    <div v-if="isMainComment || isMainReply">
      <!-- Reply comments list -->
      <div class="comments-reply-card">
        <comment-card
          v-for="(replyComment, commentIndex) in comments"
          :key="`comment-index${commentIndex}`"
          :comment="replyComment"
          class="mt-2"
          :moderable="moderable"
          :last-read="lastRead"
        />
      </div>

      <!-- Load more reply comments -->
      <client-only>
        <div v-if="$auth.loggedIn">
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
        </div>
      </client-only>

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
import { DateHelpers } from '~/mixins/DateHelpers'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'CommentCard',
  components: { LikeBtn, MarkdownText, OwnerLabel },
  mixins: [DateHelpers],
  props: {
    comment: {
      type: Object,
      required: true
    },
    getComments: {
      type: Function,
      default: null
    },
    moderable: {
      type: Boolean,
      default: false
    },
    lastRead: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      dataComment: this.comment,
      redirectTo: this.$route.fullPath,
      showReply: false,
      loadingReply: false,
      comments: [],
      loadingComments: false,
      replyCommentsPage: 1,
      noMoreReplyComments: false,
      loadingModerate: false,
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
      return this.dataComment.commentable_type !== 'Comment'
    },

    isMainReply () {
      return this.dataComment.commentable_type === 'Comment' && this.dataComment.reply_to_comment_id === null
    },

    newComment () {
      if (this.lastRead === null) {
        return false
      } else {
        return this.dateIsBeforeDate(this.comment.history.created_at, this.lastRead)
      }
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
      if (confirm(this.$t('common.areYouSurDeleteComment'))) {
        new CommentApi(this.$axios, this.$auth)
          .delete(this.dataComment.id)
          .then(() => {
            if (this.getComments) {
              this.getComments()
            }
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'comment')
          })
      }
    },

    sendReply () {
      this.loadingReply = true
      if (this.dataComment.commentable_type === 'Comment') {
        this.replyData.reply_to_comment_id = this.dataComment.commentable_id
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
        .comments(this.dataComment.id, this.replyCommentsPage)
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
    },

    getComment () {
      new CommentApi(this.$axios, this.$auth)
        .find(this.dataComment.id)
        .then((resp) => {
          this.dataComment = new Comment({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingModerate = false
        })
    },

    moderate () {
      if (confirm(this.$t('common.areYouSurDeleteComment'))) {
        this.loadingModerate = true
        new CommentApi(this.$axios, this.$auth)
          .moderateByGymAdministrator(this.dataComment.id)
          .then(() => {
            this.getComment()
          })
          .catch(() => {
            this.loadingModerate = false
          })
      }
    }
  }
}
</script>
