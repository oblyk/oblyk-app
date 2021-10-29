<template>
  <div v-if="gym">
    <gym-head :gym="gym" />
    <gym-tabs :gym="gym" />
    <router-view :gym="gym" />
    <app-footer />
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymTabs from '@/components/gyms/layouts/GymTabs'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GymView',
  components: { AppFooter, GymTabs, GymHead },
  mixins: [GymConcern]
}
</script>
