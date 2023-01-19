<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.word.new') }}
        </h2>
        <word-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import WordForm from '~/components/words/forms/WordForm'

export default {
  meta: { orphanRoute: true },
  components: { WordForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Nouvelle définition'
      },
      en: {
        metaTitle: 'New definition'
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
