<template>
  <div v-if="gym">
    <gym-head :gym="gym" />
    <gym-tabs :gym="gym" />
    <router-view :gym="gym" />
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymTabs from '@/components/gyms/layouts/GymTabs'

export default {
  name: 'GymView',
  components: { GymTabs, GymHead },
  mixins: [GymConcern]
}
</script>
