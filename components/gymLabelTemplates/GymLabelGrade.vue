<template>
  <div
    class="grade-style-none"
    :style="`font-size: ${gymLabelTemplate.label_options.grade.font_size}`"
  >
    <div class="grade-style-container">
      <div class="grade-style-grade">
        <grade-style-grade
          v-if="gymLabelTemplate.display_grade"
          :gym-route="gymRoute"
          :style="`text-transform: ${gymLabelTemplate.label_options.grade.text_transform}; ${fontFamilyStyle()}`"
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
  name: 'GymLabelGrade',
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
  },

  methods: {
    fontFamilyStyle () {
      for (const font of this.gymLabelTemplate.fonts) {
        if (font.ref === this.gymLabelTemplate.label_options.grade.font_family) {
          return `font-family: ${font.name}; line-height: ${font.line_height}`
        }
      }
    }
  }
}
</script>

<style lang="scss">
.grade-style-none {
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
  }
  .grade-style-grade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .grade-part {
      &.mono-section {
        &.nd-characters-1, &.nd-characters-2, &.nd-characters-3 { font-size: 1em; }
        &.nd-characters-4 { font-size: 0.7em; }
        &.nd-characters-5 { font-size: 0.65em; }
      }
      &.multi-sections {
        font-size: 15pt;
        line-height: 13pt;
        margin-bottom: 2mm;
      }
    }
    .points-part {
      font-size: 10pt;
      margin-top: -1mm;
    }
  }
}
</style>
