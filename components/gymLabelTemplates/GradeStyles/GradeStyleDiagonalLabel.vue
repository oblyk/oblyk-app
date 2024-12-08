<template>
  <div class="grade-style-diagonal-label">
    <div class="grade-style-container">
      <div
        class="grade-style-label"
        :class="haveWithColor ? '--dark-border' : ''"
        :style="`background: ${buildGradiantStop(colors)}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradeStyleDiagonalLabel',
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
    colors () {
      if (this.gymRoute.hold_colors.length > 0) {
        return this.gymRoute.hold_colors
      } else {
        return this.gymRoute.tag_colors
      }
    },

    haveWithColor () {
      return this.colors && this.colors.includes('#f2f2f2')
    },

    width () {
      if (this.gymLabelTemplate.display_tag_and_hold && (this.gymLabelTemplate.display_points || this.gymLabelTemplate.display_grade)) {
        return '4.5cm'
      } else {
        return '2.4cm'
      }
    }
  },

  methods: {
    buildGradiantStop (colors) {
      if (this.colors.length === 1 && this.colors[0] === '#00000000') {
        return 'linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);'
      }

      const numberOfColor = colors.length
      const gradiant = []
      if (numberOfColor === 1) {
        gradiant.push({ color: colors[0], offset: 0 })
        gradiant.push({ color: colors[0], offset: 100 })
      } else {
        let index = 0
        for (const color of colors) {
          gradiant.push({ color, offset: 100 / numberOfColor * index })
          gradiant.push({ color, offset: 100 / numberOfColor * (index + 1) })
          index++
        }
      }
      const gradiantColors = []
      for (const colorAndOffset of gradiant) {
        gradiantColors.push(`${colorAndOffset.color} ${colorAndOffset.offset}%`)
      }
      return `linear-gradient(90deg, ${gradiantColors.join(', ')});`
    }
  }
}
</script>

<style lang="scss">
.grade-style-diagonal-label {
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
    margin-left: 2mm;
    margin-right: 2mm;
    height: 14mm;
    width: 11mm;
    transform: rotate(45deg);
    box-sizing: border-box;
    &.--dark-border {
      border-style: solid;
      border-color: #777;
      border-width: 1px;
    }
  }
}
</style>
