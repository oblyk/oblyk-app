<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 text-center">
        {{ $t('common.pages.successAccountDeleting.title') }}
      </h1>

      <p class="text-center mt-10">
        {{ $t('common.pages.successAccountDeleting.description') }}<br>
        <strong>
          {{ $t('common.pages.successAccountDeleting.goodContinuation') }}
        </strong>
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
        metaTitle: 'Compte supprimé'
      },
      en: {
        metaTitle: 'Account deleted'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
