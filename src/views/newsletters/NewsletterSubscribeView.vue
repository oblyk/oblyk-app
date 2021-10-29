<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 mb-10 text-center">
        {{ $t('common.pages.newsletterSubscribe.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.newsletterSubscribe.paragraphe')" />
          <p v-html="$t('common.pages.newsletterSubscribe.stayInformed')" />
          <newsletter-subscribe-form />
        </v-col>
        <v-col class="col-md-6">
          <v-img contain src="/img/svg/contact.svg" />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import NewsletterSubscribeForm from '@/components/newsletters/forms/NewsletterSubscribeForm'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'NewsletterSubscribeView',
  components: { AppFooter, NewsletterSubscribeForm },

  metaInfo () {
    return {
      title: this.$t('meta.newsletters.subscribe.newTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.newsletter.subscribe.newDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.newsletters.subscribe.newTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.newsletter.subscribe.newDescription') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/subscribe` }
      ]
    }
  }
}
</script>
