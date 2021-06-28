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
      v-if="progressable && progressValue < 100"
    >
      {{ progressValue }}%
    </v-progress-circular>
    <p
      class="text-center"
      v-if="progressable && progressValue === 100"
    >
      {{ $t('components.photo.imageOptimization') }}
    </p>
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
