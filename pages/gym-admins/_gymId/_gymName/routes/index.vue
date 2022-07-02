<template>
  <div v-if="gym">
    <gym-admin-routes-tabs :gym="gym" />
    <nuxt-child :gym="gym" />
  </div>
</template>

<script>
import GymAdminRoutesTabs from '@/components/gyms/layouts/GymAdminRoutesTabs'
import { GymConcern } from '@/concerns/GymConcern'

export default {
  components: { GymAdminRoutesTabs },
  mixins: [GymConcern]
}
</script>
