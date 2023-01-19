<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addGuideBook') }}
        </h2>
        <guide-book-paper-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuideBookPaperForm from '~/components/guideBookPapers/forms/GuideBookPaperForm'

export default {
  meta: { orphanRoute: true },
  components: { GuideBookPaperForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un topo'
      },
      en: {
        metaTitle: 'Add guide book'
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
