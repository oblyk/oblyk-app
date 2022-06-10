<template>
  <div class="border-color-grade">
    <div
      class="grade-color-bar"
      :style="`background-image: linear-gradient(${gradeValueToColor(cragRoute.grade_gap.max_grade_value)} 50%, ${gradeValueToColor(cragRoute.grade_gap.min_grade_value)} 50%);`"
    />
    <strong class="grade-value">
      {{ cragRoute.grade_to_s }}
    </strong>
  </div>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'CragRouteAvatar',
  mixins: [GradeMixin],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.border-color-grade {
  display: inline-block;
  .grade-color-bar {
    vertical-align: middle;
    display: inline-block;
    border-radius: 3px;
    height: 1.1em;
    width: 6px;
  }
  .grade-value {
    display: inline-block;
    width: 60px;
    text-align: center;
  }
}
</style>
