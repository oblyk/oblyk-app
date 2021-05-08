<template>
  <div>
    <home v-if="!isLoggedIn" />
    <dashboard v-if="isLoggedIn" />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import Home from '@/components/homes/Home'
import Dashboard from '@/components/users/Dashboard'

export default {
  name: 'HomeView',
  mixins: [SessionConcern],
  components: {
    Dashboard,
    Home
  },

  metaInfo () {
    return {
      title: this.$t('meta.home.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.home.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.home.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.home.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
