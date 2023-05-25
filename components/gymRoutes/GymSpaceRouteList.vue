<template>
  <div>
    <!-- Sort sector select -->
    <v-row class="mb-2">
      <v-col
        :cols="currentUserIsGymAdmin() && gymAuthCan(gym, 'manage_opening') ? '10' : '12'"
      >
        <gym-space-route-sort
          v-model="sort"
          :gym="gym"
          :gym-space="gymSpace"
        />
      </v-col>
      <v-col
        v-if="currentUserIsGymAdmin() && gymAuthCan(gym, 'manage_opening')"
        cols="2"
        class="text-right"
      >
        <v-btn
          text
          icon
          large
          color="primary"
          :to="gymSpace ? `${gymSpace.path}/select-sector` : `${gym.path}/select-space`"
          :title="$t('actions.addLine')"
        >
          <v-icon>
            {{ mdiSourceBranchPlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

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
        :sectors="filteredSectors"
        :get-routes="getRoutes"
        :show-plan-options="showPlanOptions"
        :gym="gym"
      />

      <!-- If sort by opened_at -->
      <div v-if="sort === 'opened_at'">
        <gym-routes-by-opened-at
          :opened-ats="filteredOpenedAts"
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
          :grades="filteredGrades"
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
          :levels="filteredLevels"
          :get-routes="getRoutes"
        />
        <!-- if no routes in level -->
        <div v-if="levels.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>

      <!-- If sort by points -->
      <div v-if="sort === 'point'">
        <gym-routes-by-point
          :routes="filteredPoints"
          :get-routes="getRoutes"
        />
        <!-- if no routes in point -->
        <div v-if="points.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiSourceBranchPlus } from '@mdi/js'
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
import GymRoutesByPoint from '~/components/gymRoutes/listByGroup/GymRoutesByPoint.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymSpaceRouteList',
  components: {
    GymRoutesByPoint,
    GymRoutesByLevel,
    GymRoutesByGrade,
    GymRoutesByOpenedAt,
    GymRoutesBySector,
    GymSpaceRouteSort
  },
  mixins: [SessionConcern, GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymSpace: {
      type: Object,
      default: null
    },
    activeGymRouteId: {
      type: [String, Number],
      default: null
    },
    showPlanOptions: {
      type: Boolean,
      default: true
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
      points: [],
      gymRoutes: [],
      loadingRoutes: true,
      firstLoaded: false,
      showSectorId: null,
      showSectorName: null,

      mdiSourceBranchPlus
    }
  },

  computed: {
    showSectorsToast () {
      return this.showSectorId !== null
    },

    filteredSectors () {
      const sectors = []
      for (const sector of this.sectors) {
        if (!this.showSectorId || sector.sector.id === this.showSectorId) {
          sectors.push(sector)
        }
      }
      return sectors
    },

    filteredGrades () {
      const grades = []
      for (const grade of this.grades) {
        const routes = []
        for (const route of grade.routes) {
          if (!this.showSectorId || route.gym_sector_id === this.showSectorId) {
            routes.push(route)
          }
        }
        if (routes.length > 0) {
          grades.push({ grade: grade.grade, routes })
        }
      }
      return grades
    },

    filteredOpenedAts () {
      const openedAts = []
      for (const openedAt of this.openedAts) {
        const routes = []
        for (const route of openedAt.routes) {
          if (!this.showSectorId || route.gym_sector_id === this.showSectorId) {
            routes.push(route)
          }
        }
        if (routes.length > 0) {
          openedAts.push({ openedAt: openedAt.openedAt, routes })
        }
      }
      return openedAts
    },

    filteredLevels () {
      const levels = []
      for (const level of this.levels) {
        const routes = []
        for (const route of level.routes) {
          if (!this.showSectorId || route.gym_sector_id === this.showSectorId) {
            routes.push(route)
          }
        }
        if (routes.length > 0) {
          levels.push({
            name: level.name,
            colors: level.colors,
            tag_color: level.tag_color,
            hold_color: level.hold_color,
            routes
          })
        }
      }
      return levels
    },

    filteredPoints () {
      const points = []
      for (const route of this.points) {
        if (!this.showSectorId || route.gym_sector_id === this.showSectorId) {
          points.push(route)
        }
      }
      return points
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
      const gymRouteApi = new GymRouteApi(this.$axios, this.$auth)
      let promise

      if (this.gymSpace) {
        promise = gymRouteApi
          .allInSpace(
            this.gymSpace.gym.id,
            this.gymSpace.id,
            this.sort,
            this.sort
          )
      } else {
        promise = gymRouteApi
          .allInGym(
            this.gym.id,
            this.sort,
            this.sort
          )
      }

      promise
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
          } else if (this.sort === 'point') {
            this.points = []
            for (const route of resp.data) {
              this.points.push(new GymRoute({ attributes: route }))
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
        const firstGymRouteSectorName = document.querySelector('.gym-route-list-item')
        firstGymRouteSectorName.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    },

    closeSectorFilter () {
      this.$root.$emit('setMapView')
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
