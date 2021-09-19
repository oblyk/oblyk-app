<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 text-center">
        {{ $t('helps.title') }}
      </h1>

      <crag-helps />
      <account-helps />

    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import AccountHelps from '@/components/helps/AccountHelps'
import CragHelps from '@/components/helps/CragHelps'

export default {
  name: 'HelpsView',
  components: { CragHelps, AccountHelps, AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.helps.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.helps.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.helps.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.helps.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
