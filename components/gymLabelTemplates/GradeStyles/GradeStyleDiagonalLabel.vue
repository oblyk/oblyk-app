<template>
  <div class="grade-style-diagonal-label">
    <div
      class="grade-style-label"
      :style="`background-color: ${gymRoute.hold_colors[0]}`"
    />
    <div class="grade-style-grade">
      <grade-style-grade :gym-route="gymRoute" />
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
  }
}
</script>

<style lang="scss">
.grade-style-diagonal-label {
  width: 175px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  .grade-style-grade {
    padding-left: 65px;
    .grade-part {
      text-transform: uppercase;
      font-weight: 900;
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2 {
          font-size: 50px;
        }
        &.nd-characters-3 {
          font-size: 37px;
        }
        &.nd-characters-4 {
          font-size: 30px;
        }
        &.nd-characters-5 {
          font-size: 21px;
          padding-bottom: 5px;
          padding-left: 5px;
        }
      }
      &.multi-sections {
        font-size: 20px;
        padding-bottom: 8px;
        padding-left: 5px;
      }
    }
    .points-part {
      margin-top: -8px;
    }
  }
  .grade-style-label {
    z-index: -1;
    position: absolute;
    top: 18px;
    left: 20px;
    background-color: red;
    height: 60px;
    width: 40px;
    transform: rotate(45deg);
  }
}
</style>
