<template>
  <div>
    <div class="px-3 d-flex align-center border-bottom">
      <div>
        <strong>Étape :</strong> {{ step.name }}
      </div>
      <v-btn
        icon
        class="ml-auto"
        @click="showGroups = !showGroups"
      >
        <v-icon>
          {{ showGroups ? mdiChevronDown : mdiChevronUp }}
        </v-icon>
      </v-btn>
    </div>
    <div class="px-3 pb-3 pt-2 text--disabled">
      <div>
        <v-icon
          left
          small
        >
          {{ mdiSortAscending }}
        </v-icon>
        Type de classement : <strong>{{ $t(`models.contestRankingType.${step.ranking_type}`) }}</strong>
      </div>
      <div>
        <v-icon
          left
          small
        >
          {{ mdiAccountMultiple }}
        </v-icon>
        Participant : <strong>{{ step.number_of_participants }}</strong>
      </div>
    </div>
    <div
      v-if="showGroups"
      class="px-3"
    >
      <contest-ascent-stat-routes
        v-for="(group, groupIndex) in step.groups"
        :key="`group-index-${groupIndex}`"
        :group="group"
        :step="step"
        :contest="contest"
      />
    </div>
  </div>
</template>

<script>
import { mdiChevronUp, mdiChevronDown, mdiAccountMultiple, mdiSortAscending } from '@mdi/js'
import ContestAscentStatRoutes from '~/components/contests/statistics/contestAscentStatParts/ContestAscentStatRoutes'

export default {
  name: 'ContestAscentStatStep',
  components: { ContestAscentStatRoutes },
  props: {
    step: {
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
      showGroups: true,

      mdiChevronUp,
      mdiChevronDown,
      mdiAccountMultiple,
      mdiSortAscending
    }
  }
}
</script>
