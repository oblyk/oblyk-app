<template>
  <v-overlay
    absolute
    :value="overlay"
  >
    <!-- unprogressable loader -->
    <v-progress-circular
      indeterminate
      size="64"
      v-if="!progressable"
    />

    <!-- progressable loader -->
    <v-progress-circular
      :value="progressValue"
      size="64"
      v-if="progressable"
    >
      {{ progressValue }}%
    </v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: 'OverlayForm',
  props: {
    overlay: Boolean,
    progressValue: Number,
    progressable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
