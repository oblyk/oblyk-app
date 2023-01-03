<template>
  <div>
    <!-- Sort sector select -->
    <div class="mb-2">
      <gym-space-route-sort v-model="sort" />
    </div>

    <!-- Show highlighted sector -->
    <v-alert
      v-if="showSectorsToast"
      text
      dense
      color="primary"
      dismissible
      @input="closeSectorFilter"
    >
      <span v-html="$t('components.gymSpace.showSector', { name: showSectorName })" />
    </v-alert>

    <!-- Load routes -->
    <div v-if="loadingRoutes">
      <v-skeleton-loader type="list-item-avatar" />
    </div>

    <!-- Routes list -->
    <div v-if="!loadingRoutes">
      <!-- If sort by sector -->
      <gym-routes-by-sector
        v-if="sort === 'sector'"
        :sectors="sectors"
        :show-sector-id="showSectorId"
        :get-routes="getRoutes"
      />

      <!-- If sort by opened_at -->
      <div v-if="sort === 'opened_at'">
        <gym-routes-by-opened-at
          :opened-ats="openedAts"
          :show-sector-id="showSectorId"
          :get-routes="getRoutes"
        />
        <!-- if no routes in opened_ats -->
        <div v-if="openedAts.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>

      <!-- If sort by grade -->
      <div v-if="sort === 'grade'">
        <gym-routes-by-grade
          :grades="grades"
          :show-sector-id="showSectorId"
          :get-routes="getRoutes"
        />
        <!-- if no routes in grade -->
        <div v-if="grades.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>

      <!-- If sort by level -->
      <div v-if="sort === 'level'">
        <gym-routes-by-level
          :levels="levels"
          :show-sector-id="showSectorId"
          :get-routes="getRoutes"
        />
        <!-- if no routes in level -->
        <div v-if="levels.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import GymSpaceRouteSort from '@/components/gymRoutes/partial/GymSpaceRouteSort'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import GymRoute from '@/models/GymRoute'
import GymSector from '@/models/GymSector'
import GymRoutesBySector from '@/components/gymRoutes/listByGroup/GymRoutesBySector'
import GymRoutesByOpenedAt from '@/components/gymRoutes/listByGroup/GymRoutesByOpenedAt'
import GymRoutesByGrade from '@/components/gymRoutes/listByGroup/GymRoutesByGrade'
import GymRoutesByLevel from '~/components/gymRoutes/listByGroup/GymRoutesByLevel.vue'

export default {
  name: 'GymSpaceRouteList',
  components: {
    GymRoutesByLevel,
    GymRoutesByGrade,
    GymRoutesByOpenedAt,
    GymRoutesBySector,
    GymSpaceRouteSort
  },
  mixins: [SessionConcern],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    activeGymRouteId: {
      type: [String, Number],
      default: null
    }
  },

  data () {
    return {
      sort: 'opened_at',
      routes: [],
      sectors: [],
      openedAts: [],
      grades: [],
      levels: [],
      gymRoutes: [],
      loadingRoutes: true,
      firstLoaded: false,
      showSectorId: null,
      showSectorName: null
    }
  },

  computed: {
    showSectorsToast () {
      return this.showSectorId !== null
    }
  },

  watch: {
    sort () {
      if (this.firstLoaded) {
        this.getRoutes()
      }
    },
    gymSpace () {
      this.getRoutes()
    }
  },

  mounted () {
    this.$root.$on('filterBySector', (gymSectorId, sectorName) => {
      this.filterBySector(gymSectorId, sectorName)
    })

    this.$root.$on('dismountGymRoutesInSector', (gymId, spaceId, sectorId) => {
      this.dismountRoutes(gymId, spaceId, sectorId)
    })

    this.$root.$on('reloadSpaceRoutes', () => {
      this.getRoutes()
    })

    this.sort = localStorage.getItem('gym_route_sort') || 'sector'
    this.getRoutes()
  },

  beforeDestroy () {
    this.$root.$off('filterBySector')
    this.$root.$off('dismountGymRoutesInSector')
    this.$root.$off('reloadSpaceRoutes')
  },

  methods: {
    getRoutes (sectorFilter = null) {
      this.loadingRoutes = true

      new GymRouteApi(this.$axios, this.$auth)
        .allInSpace(
          this.gymSpace.gym.id,
          this.gymSpace.id,
          this.sort,
          this.sort
        )
        .then((resp) => {
          this.gymRoutes = []
          this.sectors = []
          this.grades = []
          this.openedAts = []

          // If by sector
          if (this.sort === 'sector') {
            const sectors = resp.data.sectors
            for (const sector of sectors) {
              // Next if filter sector and not good sector
              if (sectorFilter && sector.sector.id !== sectorFilter) { continue }

              const routes = []
              for (const route of sector.routes) {
                routes.push(new GymRoute({ attributes: route }))
              }
              this.sectors.push({
                sector: new GymSector({ attributes: sector.sector }),
                routes
              })
            }
          } else if (this.sort === 'opened_at') {
            // If by opened_at
            const openedAts = resp.data.opened_at
            for (const openedAt of openedAts) {
              const routes = []
              for (const route of openedAt.routes) {
                routes.push(new GymRoute({ attributes: route }))
              }
              this.openedAts.push({
                openedAt: openedAt.opened_at,
                routes
              })
            }
          } else if (this.sort === 'grade') {
            // If by grade
            const grades = resp.data.grade
            for (const grade of grades) {
              const routes = []
              for (const route of grade.routes) {
                routes.push(new GymRoute({ attributes: route }))
              }
              this.grades.push({
                grade: grade.grade,
                routes
              })
            }
          } else if (this.sort === 'level') {
            // If by level
            const levels = resp.data.level
            for (const level of levels) {
              const routes = []
              for (const route of level.routes) {
                routes.push(new GymRoute({ attributes: route }))
              }
              this.levels.push({
                name: level.name,
                colors: level.colors,
                tag_color: level.tag_color,
                hold_color: level.hold_color,
                routes
              })
            }
          }
          localStorage.setItem('gym_route_sort', this.sort)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
        .finally(() => {
          this.loadingRoutes = false
          this.firstLoaded = true
        })
    },

    filterBySector (sectorId, sectorName) {
      this.showSectorId = sectorId
      this.showSectorName = sectorName
      setTimeout(() => {
        const firstGymRouteSectorName = document.querySelector('.gym-route-sector-name')
        firstGymRouteSectorName.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    },

    closeSectorFilter () {
      this.showSectorId = null
      this.showSectorName = null
    },

    dismountRoutes (gymId, spaceId, sectorId) {
      this.loadingRoutes = true
      new GymSectorApi(this.$axios, this.$auth)
        .dismountRoutes(
          gymId,
          spaceId,
          sectorId
        )
        .then(() => {
          this.getRoutes()
        })
        .catch((err) => {
          if (err.response) {
            this.$root.$emit('alertFromApiError', err, 'gymRoute')
          }
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    }
  }
}
</script>
