<template>
  <v-container class="common-page-container">
    <v-sheet class="rounded pa-4">
      <v-skeleton-loader
        v-if="loadingComment"
        type="paragraph"
      />
      <div v-else>
        <p class="text-decoration-underline mb-1">
          {{ $t('components.comment.on') }}
        </p>
        <crag-small-card
          v-if="comment.commentable_type === 'Crag'"
          :crag="commentableObject"
          small
          bordered
        />
        <comment-card
          class="mt-4"
          :comment="comment"
        />
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { CommentConcern } from '~/concerns/CommentConcern'
import CommentCard from '~/components/comments/CommentCard.vue'
import CragSmallCard from '~/components/crags/CragSmallCard.vue'
import Crag from '~/models/Crag'

export default {
  components: { CragSmallCard, CommentCard },
  mixins: [CommentConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Commentaire'
      },
      en: {
        metaTitle: 'Comment'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    commentableObject () {
      if (this.comment.commentable_type === 'Crag') {
        return new Crag({ attributes: this.comment.commentable })
      } else {
        return null
      }
    }
  }
}
</script>
