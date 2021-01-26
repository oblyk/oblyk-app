<template>
  <span v-if="route.note" class="route-note">
    <span v-if="route.note === 0">
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="route.note === 1">
      <v-icon small>mdi-star-half-full</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="route.note === 2">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="route.note === 3">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-half-full</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="route.note === 4">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="route.note === 5">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-half-full</v-icon>
    </span>
    <span v-if="route.note === 6">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
    </span>
    <span class="text--disabled number-of-note">
      ({{ route.note_count }})
    </span>
  </span>
</template>

<script>
export default {
  name: 'CragRouteNote',
  props: {
    route: Object
  }
}
</script>

<style lang="scss" scoped>
.route-note {
  .v-icon {
    vertical-align: baseline;
  }
  .number-of-note {
    vertical-align: text-top;
    font-size: 0.7em;
  }
}
</style>
