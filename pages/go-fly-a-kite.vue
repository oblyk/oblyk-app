<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5">
        {{ $t('common.pages.goFlyAKite.title') }}
      </h1>

      <p>
        {{ $t('common.pages.goFlyAKite.strangeBehavior') }}
      </p>
      <p>
        {{ $t('common.pages.goFlyAKite.actHuman') }}
      </p>
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
        metaTitle: 'Vous êtes un robot ?',
        metaDescription: 'Vous avez un comportement anormal, nous vous avons bloqué.'
      },
      en: {
        metaTitle: 'You are robot?',
        metaDescription: 'You have an abnormal behavior, we blocked you'
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
