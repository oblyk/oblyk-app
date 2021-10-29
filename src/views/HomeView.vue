<template>
  <div>
    <home v-if="!isLoggedIn" />
    <dashboard v-if="isLoggedIn" />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
const Home = () => import('@/components/homes/Home')
const Dashboard = () => import('@/components/users/Dashboard')

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
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.home.description') }
      ]
    }
  }
}
</script>
