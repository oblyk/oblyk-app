<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addComment') }}
        </h2>
        <comment-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentForm from '~/components/comments/forms/CommentForm'

export default {
  meta: { orphanRoute: true },
  components: { CommentForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un commentaire'
      },
      en: {
        metaTitle: 'Add comment'
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
