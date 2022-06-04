<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5">
        {{ $t('common.pages.reportProblem.title') }}
      </h1>
      <p class="mt-10">
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
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import ReportForm from '@/components/reports/forms/ReportForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { ReportForm, AppFooter },

  head () {
    return {
      title: this.$t('meta.reportProblem.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.reportProblem.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.reportProblem.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.reportProblem.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
