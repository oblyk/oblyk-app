<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
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
          <v-img contain src="/svg/contact.svg" />
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
  components: { AppFooter, NewsletterUnsubscribeForm },

  data () {
    return {
      email: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Se désinscrire de la newsletter',
        metaDescription: "Vous ne voulez plus recevoir notre newsletter, c'est ici que ça se passe"
      },
      en: {
        metaTitle: 'Unsubscribe from the newsletter',
        metaDescription: "You don't want to receive our newsletter anymore, this is where it happens"
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/unsubscribe` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.email = urlParams.get('email')
  }
}
</script>
