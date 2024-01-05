<template>
  <div
    class="grade-part"
    :class="gradeClass"
  >
    <div
      v-for="(grade, gradeIndex) in grades"
      :key="`grade-index-${gradeIndex}`"
    >
      <small
        v-if="grades.length > 1"
        class="grade-anchors"
      >
        R{{ gradeIndex + 1 }}
      </small>
      {{ grade }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'GradeStyleGrade',
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  computed: {
    grades () {
      return this.gymRoute.sections.map(section => section.grade)
    },

    gradeClass () {
      const ndCharactersClass = `nd-characters-${this.gymRoute.grade_to_s.length}`
      const nbSectionClass = this.gymRoute.sections.length === 1 ? 'mono-section' : 'multi-sections'
      return `${ndCharactersClass} ${nbSectionClass}`
    }
  }
}
</script>

<style lang="scss">
.grade-anchors {
  font-family: monospace;
  font-size: 10pt;
}
</style>
