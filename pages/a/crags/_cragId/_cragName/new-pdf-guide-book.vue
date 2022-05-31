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
  components: { GuideBookPdfForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.guideBookPdf.new')
    }
  }
}
</script>
