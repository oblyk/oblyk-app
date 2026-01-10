<template>
  <span>
    <v-icon
      v-for="(level, levelIndex) in gymRoute.sub_level_max"
      :key="`level-${levelIndex}`"
      :color="gymRoute.sub_level >= level ? colors[gymRoute.sub_level_max][gymRoute.sub_level - 1] : 'rgba(150, 150, 150, 0.3)'"
      size="17"
      style="margin-right: -6px;"
    >
      {{ mdiChiliMild }}
    </v-icon>
  </span>
</template>

<script>
import { mdiChiliMild } from '@mdi/js'

export default {
  name: 'GymRouteSubLevelScale',
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      colors: {
        0: [],
        1: ['#a10026'],
        2: ['#8bbc22', '#a10026'],
        3: ['#8bbc22', '#f2b600', '#a10026'],
        4: ['#8bbc22', '#f2b600', '#fd2605', '#a10026'],
        5: ['#8bbc22', '#f2b600', '#f96a02', '#f11d10', '#a10026']
      },

      mdiChiliMild
    }
  }
}
</script>
