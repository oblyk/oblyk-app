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

  head () {
    return {
      title: this.$t('meta.newsletters.subscribe.successTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.newsletter.subscribe.successDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.newsletters.subscribe.successTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.newsletter.subscribe.successDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/newsletters/successful-subscribe` }
      ]
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
