<template>
  <span>
    <span
      v-if="gymRoute.identification_to_s === 'tag' || gymRoute.identification_to_s === 'tag_and_hold'"
    >
      <v-icon
        v-for="(color, index) in gymRoute.tag_colors"
        :key="`gym-route-tag-color-${index}`"
        medium
        v-bind:style="`color: ${color}`"
      >
        {{ mdiBookmark }}
      </v-icon>
    </span>
    <span
      v-if="gymRoute.identification_to_s === 'hold' || gymRoute.identification_to_s === 'tag_and_hold'"
    >
      <v-icon
        v-for="(color, index) in gymRoute.hold_colors"
        :key="`gym-route-hold-color-${index}`"
        medium
        v-bind:style="`color: ${color}`"
      >
        {{ mdiChartBubble }}
      </v-icon>
    </span>
  </span>
</template>

<script>
import { mdiBookmark, mdiChartBubble } from '@mdi/js'

export default {
  name: 'GymRouteTagAndHold',
  props: {
    gymRoute: Object
  },

  data () {
    return {
      mdiBookmark,
      mdiChartBubble
    }
  }
}
</script>
