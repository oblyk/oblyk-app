<template>
  <div>
    <spinner v-if="loadingGym" />

    <div v-if="!loadingGym">
      <gym-head :gym="gym" />
      <gym-tabs :gym="gym" />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Gymable } from '@/concerns/Gymable'
import Spinner from '@/components/layouts/Spiner'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymTabs from '@/components/gyms/layouts/GymTabs'

export default {
  name: 'GymView',
  components: { GymTabs, Spinner, GymHead },
  mixins: [Gymable],
  watch: {
    '$route.params.gymId': 'getGym'
  }
}
</script>
