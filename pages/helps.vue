<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 text-center">
        {{ $t('helps.title') }}
      </h1>

      <client-only>
        <crag-helps />
        <account-helps />
      </client-only>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AccountHelps from '@/components/helps/AccountHelps'
import CragHelps from '@/components/helps/CragHelps'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: {
    CragHelps,
    AccountHelps,
    AppFooter
  },

  head () {
    return {
      title: this.$t('meta.helps.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.helps.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.helps.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.helps.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
