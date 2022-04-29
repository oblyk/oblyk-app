<template>
  <div class="spinner-area" :class="fullHeight ? 'full-height' : 'small-height'">
    <v-row class="spinner-row">
      <v-col align-self="center">
        <v-progress-circular
          :size="size"
          color="primary"
          indeterminate
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'Spinner',
  props: {
    fullHeight: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 50
    }
  }
}
</script>
<style lang="scss">
.spinner-area {
  &.full-height {
    height: 10em;
  }
  &.small-height {
    height: 5em
  }
  width: 100%;
  text-align: center;
  .spinner-row {
    height: 100%;
  }
}
</style>
