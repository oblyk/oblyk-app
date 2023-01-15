<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.thanks.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6">
          <v-img contain src="/svg/thanks.svg" />
        </v-col>
        <v-col class="col-md-6">
          <p class="mt-2" v-html="$t('common.pages.thanks.body')" />
          <p class="mt-2 text-center font-weight-bold mt-10" v-html="$t('common.pages.thanks.end')" />
          <div class="text-center">
            <v-btn to="/" text color="primary">
              {{ $t('common.pages.thanks.action') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
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
        metaTitle: 'Merci !',
        metaDescription: "Un énorme merci pour votre don ! Grâce à vous, Oblyk peut continuer à se développer et envisager l'avenir plus sereinement."
      },
      en: {
        metaTitle: 'Thanks !',
        metaDescription: 'A huge thank you for your donation! Thanks to you, Oblyk can continue to develop and look forward to a brighter future.'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
