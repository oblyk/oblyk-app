<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.supportUs.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6">
          <v-img contain src="/svg/support-us.svg" />
        </v-col>
        <v-col class="col-md-6">
          <p class="mt-2" v-html="$t('common.pages.supportUs.noLimite')" />
          <p class="mt-2 font-weight-bold" v-html="$t('common.pages.supportUs.freeBut')" />
          <p class="mt-2" v-html="$t('common.pages.supportUs.unfortunately')" />
        </v-col>
      </v-row>
      <p class="mt-2" v-html="$t('common.pages.supportUs.extraEuro')" />
      <pay-pal-form class="mt-10 mb-10" />
      <p class="text-center text--disabled">
        {{ $t('common.pages.supportUs.thanks') }}
      </p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import PayPalForm from '@/components/forms/PayPalForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { PayPalForm, AppFooter },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Supporter Oblyk, faire un don',
        metaDescription: "Supporter le développement d'Oblyk pour qu'il puisse continuer à évoluer"
      },
      en: {
        metaTitle: 'Support Oblyk, make a donation',
        metaDescription: 'Support the development of Oblyk so that it can continue to evolve'
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
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
