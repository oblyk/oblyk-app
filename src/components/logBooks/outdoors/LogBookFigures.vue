<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.inFewFigures') }}
    </p>
    <v-row>
      <v-col class="col-4">
        <v-icon left>mdi-earth</v-icon>
        {{ $tc('components.logBook.figures.countries', figures.countries, { count: figures.countries }) }}
      </v-col>
      <v-col class="col-4">
        <v-icon left>mdi-terrain</v-icon>
        {{ $tc('components.logBook.figures.crags', figures.crags, { count: figures.crags }) }}
      </v-col>
      <v-col class="col-4">
        <v-icon left>mdi-pine-tree</v-icon>
        {{ $tc('components.logBook.figures.regions', figures.regions, { count: figures.regions }) }}
      </v-col>
      <v-col class="col-4">
        <v-icon left>mdi-check-all</v-icon>
        {{ $tc('components.logBook.figures.ascents', figures.ascents, { count: figures.ascents }) }}
      </v-col>
      <v-col class="col-4">
        <v-icon left>mdi-arrow-expand-vertical</v-icon>
        {{ $tc('components.logBook.figures.meters', figures.meters, { count: figures.meters }) }}
      </v-col>
      <v-col class="col-4">
        <v-icon left>mdi-arrow-collapse-up</v-icon>
        {{ $t('components.logBook.figures.max_grade', { grade: gradeValueToText(figures.max_grade_value) }) }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'LogBookFigures',
  mixins: [GradeMixin],
  props: {
    figures: Object
  }
}
</script>
