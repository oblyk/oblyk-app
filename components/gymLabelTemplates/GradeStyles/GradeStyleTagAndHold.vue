<template>
  <div
    class="grade-style-tag-and-hold"
    :style="`width: ${width}`"
  >
    <div class="grade-style-container">
      <gym-route-tag-and-hold
        v-if="gymLabelTemplate.display_tag_and_hold"
        :size="50"
        :gym-route="gymRoute"
        class="hold-and-tag"
      />
      <div
        v-if="gymLabelTemplate.display_points || gymLabelTemplate.display_grade"
        class="grade-style-grade"
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
  </div>
</template>

<script>
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold'
import GradeStyleGrade from '~/components/gymLabelTemplates/GradeStyles/shared/GradeStyleGrade'

export default {
  name: 'GradeStyleTagAndHold',
  components: { GradeStyleGrade, GymRouteTagAndHold },
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
        return '35mm'
      } else {
        return '20mm'
      }
    }
  }
}
</script>

<style lang="scss">
.grade-style-tag-and-hold {
  white-space: nowrap;
  height: 100%;
  padding-left: 3mm;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .grade-style-container {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .hold-and-tag {
    padding-top: 1mm;
    vertical-align: bottom;
  }
  .grade-style-grade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .grade-part {
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2 {
          font-size: 30pt;
          margin-top: -2mm;
        }
        &.nd-characters-3 {
          font-size: 21pt;
          padding-bottom: 1mm;
        }
        &.nd-characters-4 {
          font-size: 18pt;
        }
        &.nd-characters-5 {
          font-size: 15pt;
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
