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

  head () {
    return {
      title: this.$t('meta.reportProblem.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.reportProblem.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.reportProblem.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.reportProblem.description') }
      ]
    }
  }
}
</script>
