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

  head () {
    return {
      title: this.$t('meta.newsletters.unsubscribe.successTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.newsletter.unsubscribe.successDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.newsletters.unsubscribe.successTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.newsletter.unsubscribe.successDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/successful-unsubscribe` }
      ]
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
