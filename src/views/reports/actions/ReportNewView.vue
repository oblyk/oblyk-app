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
import ReportForm from '@/components/reports/forms/ReportForm'

export default {
  name: 'ReportNewView',
  components: { ReportForm },

  metaInfo () {
    return {
      title: this.$t('meta.reportProblem.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.reportProblem.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.reportProblem.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.reportProblem.description') }
      ]
    }
  }
}
</script>
