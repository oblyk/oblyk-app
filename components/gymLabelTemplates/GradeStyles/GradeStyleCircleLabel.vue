<template>
  <div class="grade-style-circle-label">
    <div class="grade-style-container">
      <div
        class="grade-style-label"
        :class="haveWithColor ? '--dark-border' : ''"
        :style="`background-color: ${gymRoute.hold_colors[0]}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradeStyleCircleLabel',
  props: {
    gymLabelTemplate: {
      type: Object,
      required: true
    },
    gymRoute: {
      type: Object,
      required: true
    }
  },

  computed: {
    haveWithColor () {
      return this.gymRoute.hold_colors && this.gymRoute.hold_colors.includes('#f2f2f2')
    },

    width () {
      if (this.gymLabelTemplate.display_tag_and_hold && (this.gymLabelTemplate.display_points || this.gymLabelTemplate.display_grade)) {
        return '4.5cm'
      } else {
        return '2.4cm'
      }
    }
  }
}
</script>

<style lang="scss">
.grade-style-circle-label {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  .grade-style-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }
  .grade-style-label {
    height: 14mm;
    width: 14mm;
    border-radius: 50%;
    &.--dark-border {
      border-style: solid;
      border-color: #777;
      border-width: 1px;
    }
  }
}
</style>
