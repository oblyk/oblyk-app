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

  head () {
    return {
      title: this.$t('meta.successAccountDeleting.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
