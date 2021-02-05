<template>
  <span v-if="note" class="route-note">
    <span v-if="note === 0">
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="note === 1">
      <v-icon small>mdi-star-half-full</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="note === 2">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="note === 3">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-half-full</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="note === 4">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-outline</v-icon>
    </span>
    <span v-if="note === 5">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star-half-full</v-icon>
    </span>
    <span v-if="note === 6">
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
      <v-icon small>mdi-star</v-icon>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: Number
  }
}
</script>

<style lang="scss" scoped>
.route-note {
  .v-icon {
    vertical-align: baseline;
  }
}
</style>
