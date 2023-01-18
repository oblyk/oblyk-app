<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addPdfGuideBook') }}
        </h2>
        <guide-book-pdf-form
          submit-methode="post"
          :crag-id="$route.params.cragId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuideBookPdfForm from '~/components/guideBookPdfs/forms/GuideBookPdfForm'

export default {
  meta: { orphanRoute: true },
  components: { GuideBookPdfForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un topo PDF'
      },
      en: {
        metaTitle: 'Add PDF guide'
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
