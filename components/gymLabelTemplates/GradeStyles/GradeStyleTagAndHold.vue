<template>
  <div class="grade-style-tag-and-hold">
    <div class="grade-style-container">
      <gym-route-tag-and-hold
        :size="50"
        :gym-route="gymRoute"
        class="hold-and-tag"
      />
      <div class="grade-style-grade">
        <grade-style-grade :gym-route="gymRoute" />
        <div class="points-part">
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
  }
}
</script>

<style lang="scss">
.grade-style-tag-and-hold {
  white-space: nowrap;
  height: 100%;
  width: 160px;
  padding-left: 10px;
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
    padding-top: 5px;
    vertical-align: bottom;
  }
  .grade-style-grade {
    display: inline-block;
    .grade-part {
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2 {
          font-size: 2.5em;
          margin-top: -6px;
        }
        &.nd-characters-3 {
          font-size: 1.8em;
          padding-bottom: 5px;
        }
        &.nd-characters-4 {
          font-size: 1.5em;
        }
        &.nd-characters-5 {
          font-size: 1.3em;
          padding-top: 3px;
          padding-bottom: 7px;
        }
      }
      &.multi-sections {
        font-size: 1.4em;
        padding-bottom: 5px;
      }
    }
    .points-part {
      font-size: 0.85em;
      margin-top: -5px;
    }
  }
}
</style>
