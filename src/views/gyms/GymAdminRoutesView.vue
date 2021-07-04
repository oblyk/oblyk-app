<template>
  <div v-if="gym">
    <gym-admin-routes-tabs :gym="gym" />
    <router-view :gym="gym" />
  </div>
</template>

<script>
import GymAdminRoutesTabs from '@/components/gyms/layouts/GymAdminRoutesTabs'
import { GymConcern } from '@/concerns/GymConcern'

export default {
  name: 'GymAdminRoutesView',
  mixins: [GymConcern],
  components: { GymAdminRoutesTabs }
}
</script>
