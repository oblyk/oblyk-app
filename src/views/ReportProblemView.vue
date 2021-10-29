<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5">
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
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'ReportProblemView',
  components: { ReportForm, AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.reportProblem.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.reportProblem.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.reportProblem.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.reportProblem.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
