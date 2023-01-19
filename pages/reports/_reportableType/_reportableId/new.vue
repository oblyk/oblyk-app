<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.reportProblem') }}
        </h2>
        <p>
          {{ $t('components.report.aProblem') }}
        </p>
        <p>
          {{ $t('components.report.describeProblem') }}
        </p>
        <p>
          {{ $t('components.report.thanks') }}
        </p>
        <report-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReportForm from '~/components/reports/forms/ReportForm'

export default {
  components: { ReportForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Signaler un problème',
        metaDescription: "Vous avez trouvé un problème? dit le nous pour qu'on le corrige"
      },
      en: {
        metaTitle: 'Report a problem',
        metaDescription: 'Have you found a problem? Tell us so we can fix it'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') }
      ]
    }
  }
}
</script>
