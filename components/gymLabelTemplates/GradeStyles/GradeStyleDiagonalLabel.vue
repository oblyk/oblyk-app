<template>
  <div
    class="grade-style-diagonal-label"
    :style="`width: ${width};`"
  >
    <div
      v-if="gymLabelTemplate.display_tag_and_hold"
      class="grade-style-label"
      :style="`background-color: ${gymRoute.hold_colors[0]}; left: ${gymLabelTemplate.display_points || gymLabelTemplate.display_grade ? '6.5mm' : '8mm'}`"
    />
    <div
      v-if="gymLabelTemplate.display_points || gymLabelTemplate.display_grade"
      class="grade-style-grade"
      :style="gymLabelTemplate.display_tag_and_hold ? 'padding-left: 1.9cm' : 'padding-left: 4mm'"
    >
      <grade-style-grade
        v-if="gymLabelTemplate.display_grade"
        :gym-route="gymRoute"
      />
      <div
        v-if="gymLabelTemplate.display_points"
        class="points-part"
      >
        {{ gymRoute.points }} Pts
      </div>
    </div>
  </div>
</template>

<script>
import GradeStyleGrade from '~/components/gymLabelTemplates/GradeStyles/shared/GradeStyleGrade'

export default {
  name: 'GradeStyleDiagonalLabel',
  components: { GradeStyleGrade },
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
    width () {
      if (this.gymLabelTemplate.display_tag_and_hold && (this.gymLabelTemplate.display_points || this.gymLabelTemplate.display_grade)) {
        return '4cm'
      } else {
        return '2.4cm'
      }
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
  .grade-style-grade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .grade-part {
      text-transform: uppercase;
      font-weight: 900;
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2 {
          font-size: 36pt;
        }
        &.nd-characters-3 {
          font-size: 28pt;
        }
        &.nd-characters-4 {
          font-size: 22pt;
        }
        &.nd-characters-5 {
          font-size: 16pt;
          padding-bottom: 1mm;
          padding-left: 1mm;
        }
      }
      &.multi-sections {
        font-size: 15pt;
        padding-bottom: 2mm;
        padding-left: 1mm;
      }
    }
    .points-part {
      margin-top: -2mm;
    }
  }
  .grade-style-label {
    z-index: -1;
    position: absolute;
    top: 5mm;
    height: 16mm;
    width: 11mm;
    transform: rotate(45deg);
  }
}
</style>
