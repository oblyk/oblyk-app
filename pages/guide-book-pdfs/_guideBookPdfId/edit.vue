<template>
  <v-container v-if="guideBookPdf">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4 text-truncate">
          {{ $t('actions.edit') }}
          {{ guideBookPdf.name }}
        </h2>
        <guide-book-pdf-form
          :guide-book-pdf="guideBookPdf"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookPdfConcern } from '~/concerns/GuideBookPdfConcern'
import GuideBookPdfForm from '~/components/guideBookPdfs/forms/GuideBookPdfForm'

export default {
  meta: { orphanRoute: true },
  components: { GuideBookPdfForm },
  mixins: [GuideBookPdfConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier le topo PDF'
      },
      en: {
        metaTitle: 'Edit PDF guide'
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
