<template>
  <div>
    <div v-if="!load">
      <gym-head :gym="gym" />
      <v-tabs
        show-arrows
      >
        <v-tab to="infos">
          Info
        </v-tab>
        <v-tab to="topo">
          Topos
        </v-tab>
        <gym-action-menu :gym="gym" />
      </v-tabs>

      <router-view></router-view>
    </div>
    <spinner v-if="load" />
  </div>
</template>
<script>
import { Gymable } from '@/concerns/Gymable'
import Spinner from '@/components/layouts/Spiner'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymActionMenu from '@/components/gyms/layouts/GymActionMenu'

export default {
  name: 'GymView',
  components: { GymActionMenu, Spinner, GymHead },
  mixins: [Gymable],
  props: {
    gymId: null,
    slug: null
  }
}
</script>
