<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.newsletterSubscribe.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.newsletterSubscribe.paragraphe')" />
          <p v-html="$t('common.pages.newsletterSubscribe.stayInformed')" />
          <newsletter-subscribe-form />
        </v-col>
        <v-col class="col-md-6">
          <v-img contain src="/svg/contact.svg" />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import NewsletterSubscribeForm from '~/components/newsletters/forms/NewsletterSubscribeForm'
import AppFooter from '~/components/layouts/AppFooter'

export default {
  components: { AppFooter, NewsletterSubscribeForm },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Recevoir la newsletter d'Oblyk",
        metaDescription: "Abonnez vous à la newsletter d'Oblyk pour recevoir de temps en temps des nouvelles de la communauté grimpante"
      },
      en: {
        metaTitle: 'Receive the Oblyk newsletter',
        metaDescription: 'Subscribe to the Oblyk newsletter to receive occasional news from the climbing community'
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/subscribe` }
      ]
    }
  }
}
</script>
