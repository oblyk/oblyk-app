<template>
  <span>
    <v-icon
      small
      v-if="cragRoute.difficultyAverage() > cragRoute.grade_gap.min_grade_value"
    >
      mdi-arrow-up-bold-outline
    </v-icon>
    <v-icon
      small
      v-if="cragRoute.difficultyAverage() === cragRoute.grade_gap.min_grade_value"
    >
      mdi-arrow-right-bold-outline
    </v-icon>
    <v-icon
      small
      v-if="cragRoute.difficultyAverage() < cragRoute.grade_gap.min_grade_value"
    >
      mdi-arrow-down-bold-outline
    </v-icon>
  </span>
</template>

<script>

export default {
  name: 'CragRouteDifficultyIcon',
  props: {
    cragRoute: Object
  }
}
</script>
