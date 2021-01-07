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
  }
}
</script>
