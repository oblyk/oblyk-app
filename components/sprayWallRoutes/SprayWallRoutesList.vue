<template>
  <div>
    <div class="px-2 border-bottom d-flex align-center">
      <spray-wall-route-sort v-model="sort" />
      <spray-wall-routes-filter-btn
        :filter-callback="pushFilter"
        :active="filters.length > 0"
        :gym="gym"
        :spray-wall="sprayWall"
        class="ml-auto pr-2"
      />
    </div>
    <div
      v-if="haveFilters"
      class="mb-2 mt-2 px-2"
    >
      <strong>
        {{ $t('common.filters') }} :
      </strong>
      <template v-for="filter in filters">
        <v-chip
          :key="`filter-${filter.filterKey}`"
          close
          class="mr-1"
          @click:close="removeFilter(filter)"
        >
          <v-icon
            v-if="filter.icon && filter.type === 'style'"
            left
          >
            {{ filter.icon }}
          </v-icon>
          <v-avatar
            v-if="filter.icon && filter.type === 'user'"
            left
          >
            <v-img :src="filter.icon" />
          </v-avatar>
          <v-avatar
            v-if="filter.icon && filter.type === 'spray_wall_hold'"
            left
          >
            <spray-wall-hold-svg :hold="filter.icon" :padding="0.15" />
          </v-avatar>
          {{ filter.text }}
        </v-chip>
      </template>
    </div>
    <div v-if="loadingRoutes" class="px-2 mt-2">
      <v-skeleton-loader type="list-item-avatar-two-line" />
      <v-skeleton-loader type="list-item-avatar-two-line" />
      <v-skeleton-loader type="list-item-avatar-two-line" />
    </div>
    <div
      v-else
      class="px-2"
    >
      <v-list class="py-1">
        <div
          v-for="(sprayWallRoute, sprayWallRouteIndex) in sprayWallRoutes"
          :key="`spray-wall-route-index-${sprayWallRouteIndex}`"
          @mouseenter="onMouseEnter(sprayWallRoute)"
          @mouseleave="onMouseLeaveCallback"
        >
          <spray-wall-route-item
            :spray-wall="sprayWall"
            :spray-wall-route="sprayWallRoute"
          />
        </div>
      </v-list>
      <loading-more
        :get-function="getSprayWallRoutes"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
      />
      <p
        v-if="sprayWallRoutes.length === 0"
        class="text-center py-5 font-italic text--disabled"
      >
        <span v-if="filters.length > 0">
          Il n'y a pas de bloc correspondant aux filtres sélectionnés.
        </span>
        <span v-else>
          Il n'y a pas encore de bloc proposé sur ce Spray Wall.
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mdiFilter } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore'
import SprayWallRouteItem from '~/components/sprayWallRoutes/SprayWallRouteItem'
import SprayWallRouteSort from '~/components/sprayWallRoutes/partial/SprayWallRouteSort'
import SprayWallRoutesFilterBtn from '~/components/sprayWallRoutes/partial/SprayWallRoutesFilterBtn'
import SprayWallHoldSvg from '~/components/sprayWallHolds/SprayWallHoldSvg'

export default {
  name: 'SprayWallRoutesList',
  components: { SprayWallHoldSvg, SprayWallRoutesFilterBtn, SprayWallRouteSort, SprayWallRouteItem, LoadingMore },
  mixins: [LoadingMoreHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
    },
    onMouseEnterCallback: {
      type: Function,
      default: null
    },
    onMouseLeaveCallback: {
      type: Function,
      default: null
    },
    changeFiltersCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingRoutes: true,
      sort: {
        column: 'opened_at',
        direction: 'asc'
      },
      filters: [],
      sprayWallRoutes: [],

      mdiFilter
    }
  },

  computed: {
    haveFilters () {
      return this.filters && this.filters.length > 0
    }
  },

  watch: {
    sort () {
      this.reloadRoutes()
    },

    filters () {
      this.changeFiltersCallback(this.filters)
    }
  },

  mounted () {
    this.getSprayWallRoutes()
  },

  methods: {
    getSprayWallRoutes () {
      this.moreIsBeingLoaded()
      const filters = this.filters.map((filter) => { return { type: filter.type, value: filter.value } })

      new OblykApi(this.$axios, this.$auth)
        .get(
          `/gyms/${this.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_routes`,
          {
            page: this.page,
            order_by: this.sort.column,
            direction: this.sort.direction,
            filters
          }
        )
        .then((resp) => {
          for (const route of resp.data) {
            this.sprayWallRoutes.push(route)
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingRoutes = false
          this.finallyMoreIsLoaded()
        })
    },

    reloadRoutes () {
      this.loadingRoutes = true
      this.sprayWallRoutes = []
      this.resetLoadMorePageNumber()
      this.getSprayWallRoutes()
    },

    pushFilter (filter, reload = true) {
      const filterKey = `${filter.type}.${filter.value}`
      for (const currentFilter of this.filters) {
        // Deduplicate filters
        if (filterKey === currentFilter.filterKey) {
          return false
        }
        // Only one type by filters
        if (filter.type === currentFilter.type) {
          this.removeFilter(currentFilter, false)
        }
      }
      this.filters.push({
        filterKey,
        value: filter.value,
        type: filter.type,
        text: filter.text,
        icon: filter.icon
      })
      if (reload) {
        this.reloadRoutes()
      }
    },

    removeFilter (filter, reload = true) {
      this.filters = this.filters.filter(currentFilter => currentFilter.filterKey !== filter.filterKey)

      if (reload) {
        this.reloadRoutes()
      }
    },

    onMouseEnter (sprayWallRoute) {
      if (this.onMouseEnterCallback) {
        this.onMouseEnterCallback(sprayWallRoute)
      }
    }
  }
}
</script>
