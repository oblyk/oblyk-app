<template>
  <div class="mb-4">
    <div class="mb-1 d-flex align-center">
      <div>
        <v-chip>
          <gender-icon :gender="group.genre_type" />
          {{ $t(`models.genres.${group.genre_type}`) }}
        </v-chip>
        <v-chip
          v-for="(category, categoryIndex) in group.categories"
          :key="`category-index-${categoryIndex}`"
          class="mr-1"
          outlined
        >
          {{ category }}
        </v-chip>
        <v-chip
          outlined
          title="Nombre de participant"
        >
          <v-icon left small>
            {{ mdiAccountMultiple }}
          </v-icon>
          {{ group.number_of_participants }}
        </v-chip>
      </div>
      <v-btn
        icon
        class="ml-auto"
        @click="showRoutes = !showRoutes"
      >
        <v-icon>
          {{ showRoutes ? mdiChevronDown : mdiChevronUp }}
        </v-icon>
      </v-btn>
    </div>

    <!-- ROUTES -->
    <div v-if="showRoutes">
      <division-routes-table
        v-if="step.ranking_type === 'division'"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <division-and-zone-routes-table
        v-if="['division_and_zone', 'zone_and_top_realised'].includes(step.ranking_type) "
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <division-and-attempt-routes-table
        v-if="['division_and_attempt', 'attempts_to_top'].includes(step.ranking_type)"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <attempts-to-one-zone-and-top-routes-table
        v-if="['attempts_to_one_zone_and_top'].includes(step.ranking_type)"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <fixed-points-routes-table
        v-if="['fixed_points'].includes(step.ranking_type)"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <highest-hold-table
        v-if="['highest_hold', 'point_relative_to_highest_hold'].includes(step.ranking_type)"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
      <best-times-table
        v-if="['best_times'].includes(step.ranking_type)"
        :routes="group.routes"
        :percent-color-function="percentColor"
        :click-callback="getRoute"
      />
    </div>

    <v-dialog
      v-model="routeModal"
      width="700"
    >
      <v-sheet
        v-if="loadingRoute"
        class="py-10 text-center"
      >
        <v-progress-circular indeterminate />
      </v-sheet>
      <contest-route-card
        v-else
        :contest-route="route"
        :contest="contest"
        :close-modal-callback="closeRouteModal"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mdiChevronUp, mdiChevronDown, mdiAccountMultiple } from '@mdi/js'
import GenderIcon from '~/components/ui/GenderIcon'
import ContestRouteCard from '~/components/contests/ContestRouteCard'
import ContestRouteApi from '~/services/oblyk-api/ContestRouteApi'
import ContestRoute from '~/models/ContestRoute'
const DivisionRoutesTable = () => import('~/components/contests/statistics/routeTables/DivisionRoutesTable')
const DivisionAndZoneRoutesTable = () => import('~/components/contests/statistics/routeTables/DivisionAndZoneRoutesTable')
const DivisionAndAttemptRoutesTable = () => import('~/components/contests/statistics/routeTables/DivisionAndAttemptRoutesTable')
const AttemptsToOneZoneAndTopRoutesTable = () => import('~/components/contests/statistics/routeTables/AttemptsToOneZoneAndTopRoutesTable')
const FixedPointsRoutesTable = () => import('~/components/contests/statistics/routeTables/FixedPointsRoutesTable')
const HighestHoldTable = () => import('~/components/contests/statistics/routeTables/HighestHoldTable')
const BestTimesTable = () => import('~/components/contests/statistics/routeTables/BestTimesTable')

export default {
  name: 'ContestAscentStatRoutes',
  components: { ContestRouteCard, BestTimesTable, HighestHoldTable, FixedPointsRoutesTable, AttemptsToOneZoneAndTopRoutesTable, DivisionAndAttemptRoutesTable, DivisionAndZoneRoutesTable, DivisionRoutesTable, GenderIcon },
  props: {
    group: {
      type: Object,
      required: true
    },
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
      routeModal: false,
      loadingRoute: true,
      showRoutes: true,
      route: null,

      mdiChevronUp,
      mdiChevronDown,
      mdiAccountMultiple
    }
  },

  methods: {
    getRoute (routeId) {
      this.route = null
      this.loadingRoute = true
      this.routeModal = true
      new ContestRouteApi(this.$axios, this.$auth)
        .find(this.contest.gym_id, this.contest.id, routeId)
        .then((resp) => {
          this.route = new ContestRoute({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingRoute = false
        })
    },

    percentColor (percent) {
      const hue = ((percent / 100) * 100).toString(10)
      return ['hsl(', hue, ',100%, 40%)'].join('')
    },

    closeRouteModal () {
      this.routeModal = false
    }
  }
}
</script>
