<template>
  <div>
    <spinner v-if="loadingGym" />

    <div v-if="!loadingGym">
      <gym-head :gym="gym" />

      <v-tabs show-arrows >
        <v-tab to="infos">
          Info
        </v-tab>

        <v-tab
          :to="gym.firstSpaceUrl()"
        >
          <v-badge
            color="primary"
            inline
            :content="gym.gym_spaces.length"
          >
            Topos
          </v-badge>
        </v-tab>

        <gym-action-menu
          v-if="isLoggedIn"
          :gym="gym"
        />
      </v-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Gymable } from '@/concerns/Gymable'
import { Sessionable } from '@/concerns/Sessionable'
import Spinner from '@/components/layouts/Spiner'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymActionMenu from '@/components/gyms/layouts/GymActionMenu'

export default {
  name: 'GymView',
  components: { GymActionMenu, Spinner, GymHead },
  mixins: [Gymable, Sessionable]
}
</script>
