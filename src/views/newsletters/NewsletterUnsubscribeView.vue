<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 mb-10 text-center">
        {{ $t('common.pages.newsletterUnsubscribe.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.newsletterUnsubscribe.paragraphe')" />
          <newsletter-unsubscribe-form
            :email="email"
          />
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
import NewsletterUnsubscribeForm from '@/components/newsletters/forms/NewsletterUnsubscribeForm'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'NewsletterUnsubscribeView',
  components: { AppFooter, NewsletterUnsubscribeForm },

  metaInfo () {
    return {
      title: this.$t('meta.newsletters.unsubscribe.newTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.newsletter.unsubscribe.newDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.newsletters.unsubscribe.newTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.newsletter.unsubscribe.newDescription') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/unsubscribe` }
      ]
    }
  },

  data () {
    return {
      email: null
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.email = urlParams.get('email')
  }
}
</script>
