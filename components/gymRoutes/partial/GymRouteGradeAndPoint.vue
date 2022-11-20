<template>
  <div
    class="text-center"
    :class="inline ? 'd-inline-block' : ''"
  >
    <strong
      v-if="gymRoute.points_to_s"
    >
      {{ gymRoute.points_to_s }}
    </strong>
    <strong
      v-if="gymRoute.grade_to_s"
    >
      {{ gymRoute.grade_to_s }}
    </strong>
  </div>
</template>
<script>
export default {
  name: 'GymRouteGradeAndPoint',
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  }
}
</script>
