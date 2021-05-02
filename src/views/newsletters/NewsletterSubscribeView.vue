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
          <v-img contain :src="require('@/assets/svgs/contact.svg')" />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import NewsletterSubscribeForm from '@/components/newsletters/forms/NewsletterSubscribeForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'NewsletterSubscribeView',
  components: { AppFooter, NewsletterSubscribeForm }
}
</script>
