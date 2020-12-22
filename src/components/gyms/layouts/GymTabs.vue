<template>
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

    <v-tab
      :to="'grades-list'"
    >
      <v-badge
        color="primary"
        inline
        :content="gym.gym_grades_count"
      >
        Système de difficulté
      </v-badge>
    </v-tab>

    <gym-action-menu
      v-if="isLoggedIn"
      :gym="gym"
    />
  </v-tabs>
</template>
<script>
import { Sessionable } from '@/concerns/Sessionable'
import GymActionMenu from '@/components/gyms/layouts/GymActionMenu'

export default {
  name: 'GymTabs',
  components: { GymActionMenu },
  mixins: [Sessionable],
  props: {
    gym: Object
  }
}
</script>
