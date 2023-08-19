<template>
  <v-container v-if="author">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeCover') }}
        </h2>
        <author-cover-form
          :author="author"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AuthorConcern } from '~/concerns/AuthorConcern'
import AuthorCoverForm from '~/components/authors/forms/AuthorCoverForm'

export default {
  meta: { orphanRoute: true },
  components: { AuthorCoverForm },
  mixins: [AuthorConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Ajouter une couverture à l'auteur"
      },
      en: {
        metaTitle: 'Add author cover'
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
