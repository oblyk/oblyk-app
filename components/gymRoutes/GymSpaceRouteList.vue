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
    <div
      v-if="!loadingRoutes"
      id="gym-routes-list"
    >
      <gym-sector-separator
        v-if="showSectorsToast && sort.column === 'sector'"
        :gym-sector="{ id: showSectorId, name: showSectorName }"
        :gym="gym"
        :gym-space="gymSpace"
        :show-plan-options="gymSpace !== null"
      />

      <!-- If I have no routes -->
      <div v-if="!showSectorsToast && gymSpace && sort.column === 'sector' && gymRoutes.length === 0 && currentUserIsGymAdmin()">
        <gym-sector-separator
          v-for="(allSector, allSectorIndex) in gymSpace.gym_sectors"
          :key="`space-sector-index-${allSectorIndex}`"
          :gym-space="gymSpace"
          :gym="gym"
          :gym-sector="allSector"
        />
      </div>

      <!-- Route list -->
      <div
        v-for="(route, routeIndex) in gymRoutes"
        :key="`gym-route-card-${routeIndex}`"
      >
        <!-- Gym Sector separator -->
        <div
          v-if="!showSectorsToast && sort.column === 'sector' && (routeIndex === 0 || route.gym_sector_id !== gymRoutes[routeIndex - 1].gym_sector_id)"
        >
          <gym-sector-separator
            v-for="(spaceSector, spaceSectorIndex) in sectorsBetween(routeIndex)"
            :key="`space-sector-index${spaceSectorIndex}`"
            :gym-sector="spaceSector"
            :gym="gym"
            :gym-space="route.gym_space"
            :class="routeIndex !== 0 ? 'mt-5' : ''"
            :show-plan-options="gymSpace !== null"
          />
        </div>

        <!-- Open at Separator -->
        <opened-at-separator
          v-if="sort.column === 'opened_at' && (routeIndex === 0 || openedAtDateDif(route.opened_at) !== openedAtDateDif(gymRoutes[routeIndex - 1].opened_at))"
          :opened-at="route.opened_at"
          :class="routeIndex !== 0 ? 'mt-5' : ''"
        />

        <!-- Paginate route liste -->
        <gym-route-list-item
          :highlight-sectors="showPlanOptions"
          :gym-route="route"
          :gym="gym"
          class="mb-1"
        />
      </div>

      <!-- Load last sector on space after last route -->
      <div v-if="!showSectorsToast && noMoreDataToLoad && gymSpace && sort.column === 'sector' && gymRoutes.length > 0 && currentUserIsGymAdmin()">
        <gym-sector-separator
          v-for="(allSector, allSectorIndex) in lastSectors()"
          :key="`space-sector-index-${allSectorIndex}`"
          :gym-space="gymSpace"
          :gym="gym"
          :gym-sector="allSector"
        />
      </div>

      <loading-more
        :get-function="getRoutes"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
      />

      <p
        v-if="noMoreDataToLoad"
        class="text-center text--disabled"
      >
        {{ $t('components.gymRoute.noMoreToLoad') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mdiSourceBranchPlus } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import GymSpaceRouteSort from '@/components/gymRoutes/partial/GymSpaceRouteSort'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import GymRoute from '@/models/GymRoute'
import GymSector from '@/models/GymSector'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import LoadingMore from '~/components/layouts/LoadingMore'
import GymSectorSeparator from '~/components/gymRoutes/listByGroup/GymSectorSeparator'
import OpenedAtSeparator from '~/components/gymRoutes/listByGroup/OpenedAtSeparator'

export default {
  name: 'GymSpaceRouteList',
  components: {
    OpenedAtSeparator,
    GymSectorSeparator,
    LoadingMore,
    GymRouteListItem,
    GymSpaceRouteSort
  },
  mixins: [GymRolesHelpers, LoadingMoreHelpers, DateHelpers],
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
      sort: { column: 'opened_at', direction: 'asc' },
      gymRoutes: [],
      loadingRoutes: true,
      firstLoaded: false,
      showSectorId: null,
      showSectorName: null,

      mdiSourceBranchPlus
    }
  },

  computed: {
    GymSector () {
      return GymSector
    },
    showSectorsToast () {
      return this.showSectorId !== null
    }
  },

  watch: {
    sort () {
      this.loadingRoutes = true
      this.gymRoutes = []
      this.resetLoadMorePageNumber()
      this.getRoutes()
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
      this.loadingRoutes = true
      this.gymRoutes = []
      this.resetLoadMorePageNumber()
      this.getRoutes()
    })

    this.sort.column = localStorage.getItem('gym_route_sort_column') || 'sector'
    this.sort.direction = localStorage.getItem('gym_route_sort_direction') || 'asc'
    this.getRoutes()
  },

  beforeDestroy () {
    this.$root.$off('filterBySector')
    this.$root.$off('dismountGymRoutesInSector')
    this.$root.$off('reloadSpaceRoutes')
  },

  methods: {
    getRoutes (sectorId = null, scrollToRouteListe = false) {
      const gymRouteApi = new GymRouteApi(this.$axios, this.$auth)
      let promise
      this.moreIsBeingLoaded()

      if (this.gymSpace) {
        promise = gymRouteApi
          .paginatedRoutesInSpace(
            this.gymSpace.gym.id,
            this.gymSpace.id,
            sectorId,
            this.sort.column,
            this.sort.direction,
            this.page
          )
      } else {
        promise = gymRouteApi
          .paginatedRoutesInGym(
            this.gym.id,
            sectorId,
            this.sort.column,
            this.sort.direction,
            this.page
          )
      }

      promise
        .then((resp) => {
          for (const route of resp.data) {
            this.gymRoutes.push(new GymRoute({ attributes: route }))
          }

          if (scrollToRouteListe) {
            setTimeout(() => {
              const gymRouteList = document.querySelector('#gym-routes-list')
              gymRouteList.scrollIntoView({ behavior: 'smooth' })
            }, 300)
          }

          this.successLoadingMore(resp)
          localStorage.setItem('gym_route_sort_column', this.sort.column)
          localStorage.setItem('gym_route_sort_direction', this.sort.direction)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingRoutes = false
          this.firstLoaded = true
          this.finallyMoreIsLoaded()
        })
    },

    filterBySector (sectorId, sectorName) {
      this.loadingRoutes = true
      this.showSectorId = sectorId
      this.showSectorName = sectorName
      this.gymRoutes = []
      this.resetLoadMorePageNumber()
      this.getRoutes(sectorId, true)
    },

    closeSectorFilter () {
      this.$root.$emit('setMapView')
      this.showSectorId = null
      this.showSectorName = null
      this.gymRoutes = []
      this.resetLoadMorePageNumber()
      this.getRoutes()
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
    },

    sectorsBetween (routeIndex) {
      if (this.gymSpace === null) {
        return [this.gymRoutes[routeIndex].gym_sector]
      }

      const sectors = []
      const currentSector = { ...this.gymSpace.gym_sectors.find((sector) => { return this.gymRoutes[routeIndex].gym_sector.id === sector.id }) }
      if (routeIndex !== 0) {
        const previousSector = { ...this.gymSpace.gym_sectors.find((sector) => { return this.gymRoutes[routeIndex - 1].gym_sector.id === sector.id }) }
        for (const sector of this.gymSpace.gym_sectors) {
          if (sector.order < currentSector.order && sector.order > previousSector.order) {
            sectors.push(sector)
          }
        }
      } else if (this.gymRoutes.length === 1) {
        for (const sector of this.gymSpace.gym_sectors) {
          if (sector.order < currentSector.order) {
            sectors.push(sector)
          }
        }
      }
      sectors.push(currentSector)
      return sectors
    },

    lastSectors () {
      const lastSector = { ...this.gymSpace.gym_sectors.find((sector) => { return this.gymRoutes[this.gymRoutes.length - 1].gym_sector.id === sector.id }) }
      const sectors = []
      for (const sector of this.gymSpace.gym_sectors) {
        if (sector.order > lastSector.order) {
          sectors.push(sector)
        }
      }
      return sectors
    },

    openedAtDateDif (date) {
      return this.weekDayAndFromNow(date)
    }
  }
}
</script>
