<template>
  <div class="text-center">
    <strong
      v-if="gymRoute.points"
    >
      {{ gymRoute.points }} pts
    </strong>
    <strong
      v-for="(section, index) of gymRoute.sections"
      :key="index"
    >
      {{ section.grade }}
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
