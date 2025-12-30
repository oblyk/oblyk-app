<template>
  <v-sheet
    style="width: calc(33% - 5px)"
    class="d-inline-block text-center px-2 pt-2 ml-1 rounded-sm activable-v-sheet"
    :class="styleList.includes(climbingStyle.value) ? '--active' : '--inactive'"
    @click="emit"
  >
    <v-icon
      :color="climbingStyle.color"
      large
    >
      {{ climbingStyle.icon }}
    </v-icon>
    <p class="mb-0 text-truncate">
      <small>
        {{ climbingStyle.text }}
      </small>
    </p>
  </v-sheet>
</template>

<script>
export default {
  name: 'ClimbingStyleBtn',
  props: {
    climbingStyle: {
      type: Object,
      required: true
    },
    styleList: {
      type: Array,
      required: true
    }
  },
  methods: {
    emit () {
      this.$emit('input', this.climbingStyle.value)
    }
  }
}
</script>
