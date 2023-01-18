<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.newsletterSubscribe.successTitle') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.newsletterSubscribe.successParagraphe')" />
          <p
            class="mt-4"
            v-html="$t('common.pages.newsletterSubscribe.successUnsubscribeParagraphe')"
          />
          <p class="text-center">
            <v-btn
              text
              color="primary"
              to="/newsletters/unsubscribe"
            >
              <v-icon left>
                {{ mdiEmailOff }}
              </v-icon>
              {{ $t('actions.unsubscribeMe') }}
            </v-btn>
          </p>
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
import { mdiEmailOff } from '@mdi/js'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  data () {
    return {
      mdiEmailOff
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Vous êtes abonnées à la newsletter',
        metaDescription: 'Vous êtes désormais inscrit à notre newsletter, à bientôt dans votre boîte mail'
      },
      en: {
        metaTitle: 'You are subscribed to the newsletter',
        metaDescription: 'You are now subscribed to our newsletter, see you soon in your mailbox'
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/successful-subscribe` }
      ]
    }
  }
}
</script>
