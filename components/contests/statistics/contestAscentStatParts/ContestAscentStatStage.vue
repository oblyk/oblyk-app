<template>
  <div>
    <div class="align-center">
      <v-chip
        class="font-weight-medium"
        @click="showSteps = !showSteps"
      >
        <v-icon left>
          {{ showSteps ? mdiChevronDown : mdiChevronUp }}
        </v-icon>
        Épreuve : {{ stage.name || $t(`models.climbs.${stage.climbing_type}`) }}
      </v-chip>
    </div>
    <div
      v-if="showSteps"
      class="mb-10 mt-1 border rounded"
    >
      <contest-ascent-stat-step
        v-for="(step, stepIndex) in stage.steps"
        :key="`step-index-${stepIndex}`"
        :step="step"
        :contest="contest"
      />
    </div>
  </div>
</template>

<script>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import ContestAscentStatStep from '~/components/contests/statistics/contestAscentStatParts/ContestAscentStatStep'

export default {
  name: 'ContestAscentStatStage',
  components: { ContestAscentStatStep },
  props: {
    stage: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showSteps: true,

      mdiChevronUp,
      mdiChevronDown
    }
  }
}
</script>
