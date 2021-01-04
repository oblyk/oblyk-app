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
        mdi-bookmark
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
        mdi-chart-bubble
      </v-icon>
    </span>
  </span>
</template>
<script>
export default {
  name: 'GymRouteTagAndHold',
  props: {
    gymRoute: Object
  }
}
</script>
