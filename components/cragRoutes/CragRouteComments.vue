<template>
  <div>
    <p>
      <v-icon left>
        {{ mdiCommentAccount }}
      </v-icon>
      {{ $t('components.cragRoute.climberOpinion') }}
    </p>

    <v-skeleton-loader
      v-if="loadingComments"
      class="mx-auto"
      type="list-item-three-line"
    />

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
          v-if="comment.type === 'AscentComment'"
          class="rounded-sm back-app-color pa-2"
        >
          <markdown-text
            v-if="comment.comment.comment"
            :text="comment.comment.comment"
          />
          <div>
            <note v-if="comment.comment.note !== null" :note="comment.comment.note" />
            <small>
              <nuxt-link :to="`/climbers/${comment.comment.creator.slug_name}`">
                {{ comment.comment.creator.full_name }}
              </nuxt-link>
              {{ $t('common.at') }} {{ humanizeDate(comment.comment.released_at) }}
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
    <client-only>
      <div
        v-if="$auth.loggedIn"
        class="text-right mt-4"
      >
        <v-btn
          :to="`/comments/CragRoute/${cragRoute.id}/new?redirect_to=${redirectTo}`"
          text
          outlined
          color="primary"
        >
          <v-icon left small>
            {{ mdiCommentPlus }}
          </v-icon>
          {{ $t('actions.addComment') }}
        </v-btn>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mdiCommentAccount, mdiCommentPlus } from '@mdi/js'
import CommentApi from '~/services/oblyk-api/CommentApi'
import Comment from '@/models/Comment'
import CommentCard from '@/components/comments/CommentCard'
import Note from '@/components/notes/Note'
import { DateHelpers } from '@/mixins/DateHelpers'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'CragRouteComments',
  components: { MarkdownText, Note, CommentCard },
  mixins: [DateHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      comments: [],
      loadingComments: true,
      redirectTo: this.$route.fullPath,

      mdiCommentAccount,
      mdiCommentPlus
    }
  },

  watch: {
    cragRoute () {
      this.getComments()
    }
  },

  mounted () {
    this.getComments()
  },

  methods: {
    getComments () {
      this.loadingComments = true
      new CommentApi(this.$axios, this.$auth)
        .allInCommentable('CragRoute', this.cragRoute.id)
        .then((resp) => {
          this.comments = []
          for (const comment of resp.data) {
            this.comments.push(new Comment({ attributes: comment }))
          }
          this.fullComments()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        })
        .then(() => {
          this.loadingComments = false
        })
    },

    fullComments () {
      const comments = {}
      const sortComments = []
      for (const comment of this.comments) {
        comments[this.isoDate(comment.history.created_at)] = {
          type: 'Comment',
          comment
        }
      }

      for (const ascentComment of this.cragRoute.ascent_comments) {
        comments[this.isoDate(ascentComment.released_at)] = {
          type: 'AscentComment',
          comment: ascentComment
        }
      }

      Object.keys(comments).sort().forEach((key) => {
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
