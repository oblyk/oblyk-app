<template>
  <span>
    <v-icon
      v-for="(color, index) in gymRoute.tag_colors"
      :key="`gym-route-tag-color-${index}`"
      medium
      v-bind:style="`color: ${color}`"
    >
      mdi-bookmark
    </v-icon>
    <v-icon
      v-for="(color, index) in gymRoute.hold_colors"
      :key="`gym-route-hold-color-${index}`"
      medium
      v-bind:style="`color: ${color}`"
    >
      mdi-chart-bubble
    </v-icon>
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
