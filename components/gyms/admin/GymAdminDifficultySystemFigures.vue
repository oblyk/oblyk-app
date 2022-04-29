<template>
  <v-card
    :to="gym.gym_grades_count > 0 ? `${gym.adminPath}/grades-list` : `${gym.adminPath}/first-difficulty-system`"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        {{ mdiSortBoolAscending }}
      </v-icon>
      {{ $t('components.gymAdmin.difficultySystem') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ gym.gym_grades_count }}
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiSortBoolAscending } from '@mdi/js'
export default {
  name: 'GymAdminDifficultySystemFigures',
  props: {
    gym: Object
  },

  data () {
    return {
      mdiSortBoolAscending
    }
  }
}
</script>
