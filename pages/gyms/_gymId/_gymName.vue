<template>
  <div v-if="gym">
    <gym-head :gym="gym" />
    <gym-tabs :gym="gym" />
    <nuxt-child :gym="gym" />
    <app-footer />
  </div>
</template>

<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymTabs from '@/components/gyms/layouts/GymTabs'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, GymTabs, GymHead },
  mixins: [GymConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  }
}
</script>
