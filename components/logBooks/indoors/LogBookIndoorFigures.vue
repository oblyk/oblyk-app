<template>
  <v-row>
    <v-col cols="12" md="4" lg="2">
      <v-sheet class="pt-11 pa-4 rounded-sm back-app-color">
        <p class="mb-9 text-center">
          <span class="text-h2">
            {{ figures.ascents }}
          </span>
          <span class="text--disabled">{{ $t('common.ascents') }}</span>
        </p>
      </v-sheet>
    </v-col>
    <v-col>
      <v-row>
        <v-col cols="6" md="4">
          <v-icon left>
            {{ mdiEarth }}
          </v-icon>
          {{ $tc('components.logBook.figures.countries', figures.countries, { count: figures.countries }) }}
        </v-col>
        <v-col cols="6" md="4">
          <v-icon left>
            {{ mdiTerrain }}
          </v-icon>
          {{ $tc('components.logBook.figures.gyms', figures.gyms, { count: figures.gyms }) }}
        </v-col>
        <v-col cols="6" md="4">
          <v-icon left>
            {{ mdiPineTree }}
          </v-icon>
          {{ $tc('components.logBook.figures.regions', figures.regions, { count: figures.regions }) }}
        </v-col>
        <v-col cols="6" md="4">
          <v-icon left>
            {{ mdiArrowExpandAll }}
          </v-icon>
          {{ $tc('components.logBook.figures.meters', figures.meters, { count: figures.meters }) }}
        </v-col>
        <v-col cols="6" md="4">
          <v-icon left>
            {{ mdiArrowCollapseUp }}
          </v-icon>
          {{ $t('components.logBook.figures.max_grade', { grade: gradeValueToText(figures.max_grade_value) }) }}
        </v-col>
        <v-col
          v-if="$auth.loggedIn && user.id === $auth.user.id"
          cols="12"
          class="text-right"
        >
          <v-btn
            text
            outlined
            class="mr-2"
            to="/home/climbing-sessions?only-indoor=true"
          >
            <v-icon
              left
              color="primary"
            >
              {{ mdiTimelineText }}
            </v-icon>
            {{ $t('components.climbingSession.myIndoorSession') }}
          </v-btn>
          <v-btn
            text
            outlined
            to="/ascents/indoor/new"
          >
            <v-icon
              left
              color="primary"
            >
              {{ mdiPlusBoxOutline }}
            </v-icon>
            {{ $t('actions.addMyAscents') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiEarth,
  mdiTerrain,
  mdiPineTree,
  mdiArrowExpandAll,
  mdiArrowCollapseUp,
  mdiPlusBoxOutline,
  mdiTimelineText
} from '@mdi/js'
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'LogBookIndoorFigures',
  mixins: [GradeMixin],
  props: {
    figures: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiEarth,
      mdiTerrain,
      mdiPineTree,
      mdiArrowExpandAll,
      mdiArrowCollapseUp,
      mdiPlusBoxOutline,
      mdiTimelineText
    }
  }
}
</script>
