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

  head () {
    return {
      title: this.$t('meta.supportUs.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.supportUs.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.supportUs.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.supportUs.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
