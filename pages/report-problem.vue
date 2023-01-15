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
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
