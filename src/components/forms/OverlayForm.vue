<template>
  <v-overlay
    absolute
    :value="overlay"
  >
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: 'OverlayForm',
  props: {
    overlay: Boolean
  }
}
</script>
