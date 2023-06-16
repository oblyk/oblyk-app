<template>
  <v-overlay
    absolute
    :class="rounded ? 'rounded' : ''"
    :value="overlay"
  >
    <!-- unprogressable loader -->
    <v-progress-circular
      v-if="!progressable"
      indeterminate
      size="64"
    />

    <!-- progressable loader -->
    <v-progress-circular
      v-if="progressable && progressValue < 100"
      :value="progressValue"
      size="64"
    >
      {{ progressValue }}%
    </v-progress-circular>
    <p
      v-if="progressable && progressValue === 100"
      class="text-center"
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
    progressValue: {
      type: Number,
      default: null
    },
    progressable: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
