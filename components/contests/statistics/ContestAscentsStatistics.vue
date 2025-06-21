<template>
  <v-sheet class="rounded pa-4 mt-2">
    <div class="d-flex align-center">
      <p class="font-weight-bold mb-0">
        <v-icon left class="vertical-align-top">
          {{ mdiCheckBold }}
        </v-icon>
        Ouvertures & Ascensions
      </p>
      <v-btn
        icon
        class="ml-auto"
        @click="showData = !showData"
      >
        <v-icon>
          {{ showData ? mdiChevronDown : mdiChevronUp }}
        </v-icon>
      </v-btn>
    </div>

    <div
      v-if="showData"
      class="mt-4"
    >
      <!-- STAGES -->
      <contest-ascent-stat-stage
        v-for="(stage, stageIndex) in statistics.ascents.by_steps"
        :key="`stage-index-${stageIndex}`"
        :contest="contest"
        :stage="stage"
        class="mb-4"
      />
    </div>
  </v-sheet>
</template>

<script>
import { mdiCheckBold, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import ContestAscentStatStage from '~/components/contests/statistics/contestAscentStatParts/ContestAscentStatStage'

export default {
  name: 'ContestAscentsStatistics',
  components: {
    ContestAscentStatStage
  },
  props: {
    contest: {
      type: Object,
      required: true
    },
    statistics: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showData: true,

      mdiCheckBold,
      mdiChevronDown,
      mdiChevronUp
    }
  }
}
</script>
