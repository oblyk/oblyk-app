<template>
  <span>
    <span v-html="gradeToHtml(cragRoute.grade_gap.min_grade_value, cragRoute.grade_gap.min_grade_text)" />
    <v-icon v-if="hasGapGrade()">mdi-arrow-right</v-icon>
    <span v-if="hasGapGrade()" v-html="gradeToHtml(cragRoute.grade_gap.max_grade_value, cragRoute.grade_gap.max_grade_text)" />
  </span>
</template>
<script>
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'CragRouteGrade',
  mixins: [GradeMixin],
  props: {
    cragRoute: Object
  },

  methods: {
    hasGapGrade () {
      return this.cragRoute.grade_gap.max_grade_text !== this.cragRoute.grade_gap.min_grade_text
    }
  }
}
</script>
