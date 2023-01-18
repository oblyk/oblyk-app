<template>
  <v-container>
    <spinner v-if="loadingComment" />

    <v-row v-if="!loadingComment" justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.editComment') }}
        </h2>
        <comment-form
          submit-methode="put"
          :comment="comment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CommentConcern } from '~/concerns/CommentConcern'
import Spinner from '~/components/layouts/Spiner'
import CommentForm from '~/components/comments/forms/CommentForm'

export default {
  meta: { orphanRoute: true },
  components: { CommentForm, Spinner },
  mixins: [CommentConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier le commentaire'
      },
      en: {
        metaTitle: 'Edit comment'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
