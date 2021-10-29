<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-16 mb-10 text-center">
        {{ $t('common.pages.newsletterUnsubscribe.successTitle') }}
      </h1>
      <p
        class="grey--text text-center"
        v-html="$t('common.pages.newsletterUnsubscribe.successParagraphe')"
      />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'NewsletterSuccessUnsubscribeView',
  components: { AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.newsletters.unsubscribe.successTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.newsletter.unsubscribe.successDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.newsletters.unsubscribe.successTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.newsletter.unsubscribe.successDescription') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/successful-unsubscribe` }
      ]
    }
  }
}
</script>
