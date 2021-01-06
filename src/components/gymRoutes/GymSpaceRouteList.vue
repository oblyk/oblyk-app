<template>
  <div>
    <!-- Sort sector select -->
    <gym-space-route-sort v-model="sort" />

    <!-- Active filter -->
    <div v-if="filter.text">
      <v-chip
        class="ma-2"
        close
        @click:close="clearFilter()"
      >
        <v-icon x-small left>
          {{ filter.icon }}
        </v-icon>
        {{ filter.text }}
      </v-chip>
    </div>

    <!-- Load routes -->
    <spinner v-if="loadingRoutes" :full-height="false" />

    <!-- Routes list -->
    <div v-if="!loadingRoutes">
      <div
        v-for="(route, index) in routes"
        :key="`gym-route-card-${route.id}`"
        class="mb-3"
      >
        <!-- Sector head -->
        <gym-route-sort-by-sector
          v-if="sort === 'sector' && (index === 0 || route.gym_sector_name !== routes[index - 1].gym_sector_name)"
          :gym-route="route"
        />

        <!-- Route card -->
        <gym-route-card
          :gym-route="route"
          :get-space-routes="getRoutes"
        />

        <!-- Add route in sector -->
        <div v-if="currentUserIsGymAdmin() && sort === 'sector' && (index === routes.length -  1 || route.gym_sector_name !== routes[index + 1].gym_sector_name)">
          <gym-route-add-in-sort-by-sector :gym-route="route" />
        </div>
      </div>

      <!-- if no routes -->
      <div v-if="routes.length === 0">
        <p class="text-center text--disabled">
          {{ $t('components.gymRoute.noRoute') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import GymRouteCard from '@/components/gymRoutes/GymRouteCarde'
import GymSpaceRouteSort from '@/components/gymRoutes/partial/GymSpaceRouteSort'
import GymRouteSortBySector from '@/components/gymRoutes/partial/GymRouteSortBySector'
import GymRouteAddInSortBySector from '@/components/gymRoutes/partial/GymRouteAddInSortBySector'
import Spinner from '@/components/layouts/Spiner'
import gymRouteApi from '@/services/oblyk-api/gymRouteApi'
import GymSectorApi from '@/services/oblyk-api/gymSectorApi'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymSpaceRouteList',
  components: {
    Spinner,
    GymRouteAddInSortBySector,
    GymRouteSortBySector,
    GymSpaceRouteSort,
    GymRouteCard
  },
  mixins: [SessionConcern],
  props: {
    gymSpace: Object
  },

  data () {
    return {
      sort: (localStorage.getItem('gym_route_sort') || 'opened_at'),
      routes: [],
      gymRoutes: [],
      loadingRoutes: true,
      filter: {
        text: null,
        icon: null
      }
    }
  },

  mounted () {
    this.$root.$on('filtreBySector', (gymSectorId) => {
      this.filtreBySector(gymSectorId)
    })

    this.$root.$on('dismountGymRoutesInSector', (gymId, spaceId, sectorId) => {
      this.dismountRoutes(gymId, spaceId, sectorId)
    })

    this.getRoutes()
  },

  watch: {
    sort: function () {
      this.sortRoutes()
      localStorage.setItem('gym_route_sort', this.sort)
    }
  },

  methods: {
    getRoutes: function () {
      this.loadingRoutes = true
      gymRouteApi
        .allInSpace(this.gymSpace.gym.id, this.gymSpace.id)
        .then(resp => {
          this.gymRoutes = []
          const routes = resp.data
          for (const route of routes) {
            this.gymRoutes.push(new GymRoute(route))
          }
          this.sortRoutes()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    sortRoutes: function () {
      if (this.sort === 'sector') {
        this.routes = this.sortBySector()
      } else {
        this.routes = this.gymRoutes
      }
    },

    sortBySector: function () {
      return this.gymRoutes.sort(function (a, b) { return a.gym_sector_name - b.gym_sector_name })
    },

    filtreBySector: function (sectorId) {
      const routes = []
      this.filter.text = `secteur ${sectorId}`
      this.filter.icon = 'mdi-texture-box'
      for (const route of this.gymRoutes) {
        if (route.gym_sector_id === sectorId) routes.push(route)
      }
      this.routes = routes
    },

    clearFilter: function () {
      this.routes = this.gymRoutes
      this.filter.text = null
      this.filter.icon = null
    },

    dismountRoutes: function (gymId, spaceId, sectorId) {
      this.loadingRoutes = true
      GymSectorApi
        .dismountRoutes(
          gymId,
          spaceId,
          sectorId
        )
        .then(() => {
          this.getRoutes()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
          this.loadingRoutes = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
