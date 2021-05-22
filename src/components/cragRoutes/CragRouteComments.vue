<template>
  <div>
    <p>
      <v-icon left>
        mdi-comment-account
      </v-icon>
      {{ $t('components.cragRoute.climberOpinion') }}
    </p>
    <spinner v-if="loadingComments" :full-height="false" />

    <!-- Comment list -->
    <div v-else>
      <div
        v-for="comment in fullComments()"
        :key="comment.id"
        class="mt-3"
      >
        <comment-card
          v-if="comment.type === 'Comment'"
          :get-comments="getComments"
          :comment="comment.comment"
        />

        <div
          class="ascent-comment-card"
          v-if="comment.type === 'AscentComment'"
        >
          <markdown-text :text="comment.comment.comment" />
          <div>
            <note v-if="comment.comment.note" :note="comment.comment.note" />
            <small>
              {{ comment.comment.creator.name }} {{ $t('common.at') }} {{ humanizeDate(comment.comment.released_at) }}
            </small>
          </div>
        </div>
      </div>

      <!-- No comment -->
      <p
        v-if="fullComments().length === 0"
        class="text--disabled text-center mt-1"
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
        :to="`/comments/CragRoute/${cragRoute.id}/new?redirect_to=${redirectTo}`"
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
import { SessionConcern } from '@/concerns/SessionConcern'
import moment from 'moment'
import CommentApi from '@/services/oblyk-api/CommentApi'
import Comment from '@/models/Comment'
import CommentCard from '@/components/comments/CommentCard'
import Spinner from '@/components/layouts/Spiner'
import Note from '@/components/notes/Note'
import { DateHelpers } from '@/mixins/DateHelpers'
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'CragRouteComments',
  components: { MarkdownText, Note, Spinner, CommentCard },
  mixins: [SessionConcern, DateHelpers],
  props: {
    cragRoute: Object
  },

  data () {
    return {
      comments: [],
      loadingComments: true,
      redirectTo: this.$route.fullPath
    }
  },

  watch: {
    cragRoute: function () {
      this.getComments()
    }
  },

  mounted () {
    this.getComments()
  },

  methods: {
    getComments: function () {
      this.loadingComments = true
      CommentApi
        .allInCommentable('CragRoute', this.cragRoute.id)
        .then(resp => {
          this.comments = []
          for (const comment of resp.data) {
            this.comments.push(new Comment(comment))
          }
          this.fullComments()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        })
        .then(() => {
          this.loadingComments = false
        })
    },

    fullComments: function () {
      const comments = {}
      const sortComments = []
      for (const comment of this.comments) {
        comments[moment(comment.history.created_at).format('YYYY-MM-DD')] = {
          type: 'Comment',
          comment: comment
        }
      }

      for (const ascentComment of this.cragRoute.ascent_comments) {
        comments[moment(ascentComment.released_at).format('YYYY-MM-DD')] = {
          type: 'AscentComment',
          comment: ascentComment
        }
      }

      Object.keys(comments).sort().forEach(key => {
        sortComments.push({
          type: comments[key].type,
          comment: comments[key].comment
        })
      })

      return sortComments.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
.ascent-comment-card {
  border-radius: 5px;
  padding: 10px;
}

.theme--light {
  .ascent-comment-card {
    background-color: #f5f5f5;
  }
}

.theme--dark {
  .ascent-comment-card {
    background-color: #121212;
  }
}
</style>
