<template>
  <div class="grade-style-tag-and-hold">
    <div class="grade-style-container">
      <gym-route-tag-and-hold
        :size="50"
        :gym-route="gymRoute"
        class="hold-and-tag"
      />
    </div>
  </div>
</template>

<script>
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold'

export default {
  name: 'GradeStyleTagAndHold',
  components: { GymRouteTagAndHold },
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
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .grade-style-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }
  .hold-and-tag {
    padding-top: 1mm;
    vertical-align: bottom;
  }
}
</style>
