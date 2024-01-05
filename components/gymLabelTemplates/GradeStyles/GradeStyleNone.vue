<template>
  <div class="grade-style-none">
    <div class="grade-style-container">
      <div class="grade-style-grade">
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
  </div>
</template>

<script>
import GradeStyleGrade from '~/components/gymLabelTemplates/GradeStyles/shared/GradeStyleGrade'

export default {
  name: 'GradeStyleNone',
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
.grade-style-none {
  white-space: nowrap;
  height: 100%;
  width: 24mm;
  padding-left: 5mm;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .grade-style-container {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .grade-style-grade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .grade-part {
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2 {
          font-size: 31pt;
          margin-top: -2mm;
        }
        &.nd-characters-3 {
          font-size: 21pt;
          padding-bottom: 2mm;
        }
        &.nd-characters-4 {
          font-size: 18pt;
        }
        &.nd-characters-5 {
          font-size: 16pt;
          padding-top: 1mm;
          padding-bottom: 2mm;
        }
      }
      &.multi-sections {
        font-size: 16pt;
        padding-bottom: 1mm;
      }
    }
    .points-part {
      font-size: 10pt;
      margin-top: -1mm;
    }
  }
}
</style>
