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
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'NewsletterUnsubscribeView',
  components: { AppFooter, NewsletterUnsubscribeForm },

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
