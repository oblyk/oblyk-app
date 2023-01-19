<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-16 mb-10 text-center">
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
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Vous n'êtes plus inscrit à la newsletter",
        metaDescription: 'Vous être désinscrit de la newsletter, à bientôt'
      },
      en: {
        metaTitle: 'You are no longer subscribed to the newsletter',
        metaDescription: 'You are unsubscribed from the newsletter, see you soon'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/successful-unsubscribe` }
      ]
    }
  }
}
</script>
