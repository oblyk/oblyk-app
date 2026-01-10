<template>
  <span
    :style="`color: ${color};`"
    class="font-weight-bold"
  >
    <span>
      {{ gymRoute.sub_level }}
    </span>
    <v-icon
      class="vertical-align-text-top"
      :color="color"
      small
      style="margin-left: -6px; padding-top: 1px"
    >
      {{ mdiChiliMild }}
    </v-icon>
  </span>
</template>

<script>
import { mdiChiliMild } from '@mdi/js'

export default {
  name: 'GymRouteSubLevel',
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
  },

  computed: {
    color () {
      return this.colors[this.gymRoute.sub_level_max][this.gymRoute.sub_level - 1]
    }
  }
}
</script>
