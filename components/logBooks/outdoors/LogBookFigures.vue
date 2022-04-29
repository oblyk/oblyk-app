<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.inFewFigures') }}
    </p>
    <v-row>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiEarth }}
        </v-icon>
        {{ $tc('components.logBook.figures.countries', figures.countries, { count: figures.countries }) }}
      </v-col>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiTerrain }}
        </v-icon>
        {{ $tc('components.logBook.figures.crags', figures.crags, { count: figures.crags }) }}
      </v-col>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiPineTree }}
        </v-icon>
        {{ $tc('components.logBook.figures.regions', figures.regions, { count: figures.regions }) }}
      </v-col>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiCheckAll }}
        </v-icon>
        {{ $tc('components.logBook.figures.ascents', figures.ascents, { count: figures.ascents }) }}
      </v-col>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiArrowExpandAll }}
        </v-icon>
        {{ $tc('components.logBook.figures.meters', figures.meters, { count: figures.meters }) }}
      </v-col>
      <v-col class="col-6 col-md-4">
        <v-icon left>
          {{ mdiArrowCollapseUp }}
        </v-icon>
        {{ $t('components.logBook.figures.max_grade', { grade: gradeValueToText(figures.max_grade_value) }) }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiEarth, mdiTerrain, mdiPineTree, mdiCheckAll, mdiArrowExpandAll, mdiArrowCollapseUp } from '@mdi/js'
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'LogBookFigures',
  mixins: [GradeMixin],
  props: {
    figures: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiEarth,
      mdiTerrain,
      mdiPineTree,
      mdiCheckAll,
      mdiArrowExpandAll,
      mdiArrowCollapseUp
    }
  }
}
</script>
