<template>
  <div class="text-center">
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
    gymRoute: Object
  }
}
</script>
