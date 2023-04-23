<template>
  <div
    ref="crag-route-area"
    :v-resize="areaResize()"
  >
    <v-card :elevation="cardElevation">
      <v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-icon left>
              {{ mdiSourceBranch }}
            </v-icon>
            {{ $t(titleTranslateKey) }}
          </v-col>
          <v-col
            v-if="isLoggedIn"
            cols="12"
            md="6"
            class="add-sector-or-route"
          >
            <client-only>
              <slot
                v-if="hasCustomAddedBtn"
                name="add-btn"
              />
              <add-sector-or-route-btn
                v-else
                :crag="crag"
                :crag-sector="cragSector"
              />
            </client-only>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col>
            <crag-route-search
              v-model="query"
              :crag-sector="cragSector"
              :crag="crag"
            />
          </v-col>
          <v-col v-if="showRouteSort">
            <crag-route-sort v-model="routeSort" />
          </v-col>
          <v-col>
            <crag-sector-selector
              v-model="cragSectorId"
              :crag="crag"
              :crag-sector="cragSector"
              :is-filter="sectorSelectorIsFilter"
            />
          </v-col>
        </v-row>
      </v-card-subtitle>

      <v-card-text>
        <crag-route-figures
          :crag="crag"
          :crag-sector="cragSector"
        />
      </v-card-text>

      <v-sheet
        v-if="!$auth.loggedIn"
        class="rounded text-center pa-4 my-2 border mx-4"
      >
        <p class="mb-2" v-html="$t('components.cragRoute.mustBeLogin')" />
        <div>
          <v-btn
            elevation="0"
            color="primary"
            :to="`/sign-in?redirect_to=${$route.fullPath}`"
          >
            {{ $t('actions.signIn') }}
          </v-btn>
          <v-btn
            elevation="0"
            color="primary"
            :to="`/sign-up?redirect_to=${$route.fullPath}`"
          >
            {{ $t('actions.signUp') }}
          </v-btn>
        </div>
      </v-sheet>

      <v-skeleton-loader
        v-if="loadingRoutes"
        class="mx-auto"
        type="list-item-avatar-two-line"
      />

      <div
        v-if="!loadingRoutes"
      >
        <v-list
          subheader
          two-line
        >
          <div
            v-for="(route, index) in routes"
            :key="`crag-route-${index}`"
          >
            <crag-route-list-item
              :route="route"
              :callback="cragRouteCallback"
            />
          </div>

          <loading-more
            v-if="query === null && !disableLoadingMore"
            :get-function="getRoutes"
            :loading-more="loadingMoreData"
            :no-more-data="noMoreDataToLoad"
            skeleton-type="list-item-avatar-two-line, list-item-avatar-two-line"
          />
        </v-list>

        <!-- If no routes -->
        <v-card-text v-if="routes.length === 0" class="text-center text--disabled pb-10">
          {{ $t('components.crag.noRoutes') }}
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mdiSourceBranch } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'
import LoadingMore from '@/components/layouts/LoadingMore'
import AddSectorOrRouteBtn from '@/components/cragRoutes/partial/AddSectorOrRouteBtn'
import CragSectorSelector from '@/components/cragRoutes/partial/CragSectorSelector'
import CragRouteSort from '@/components/cragRoutes/partial/CragRouteSort'
import CragRouteSearch from '@/components/cragRoutes/partial/CragRouteSearch'
import CragRouteFigures from '@/components/cragRoutes/CragRouteFigures'

export default {
  name: 'CragRoutes',
  components: {
    CragRouteFigures,
    CragRouteSearch,
    CragRouteSort,
    CragSectorSelector,
    AddSectorOrRouteBtn,
    LoadingMore,
    CragRouteListItem
  },
  mixins: [SessionConcern, LoadingMoreHelpers],

  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    },
    cardElevation: {
      type: Number,
      default: 0
    },
    titleTranslateKey: {
      type: String,
      default: 'components.cragRoute.routes'
    },
    cragRouteCallback: {
      type: Function,
      default: null
    },
    sectorSelectorIsFilter: {
      type: Boolean,
      default: false
    },
    showRouteSort: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      query: null,
      routeSort: 'difficulty_desc',
      loadingRoutes: true,
      routes: [],
      areaHeight: 0,
      cragSectorId: null,
      disableLoadingMore: false,

      mdiSourceBranch
    }
  },

  computed: {
    hasCustomAddedBtn () {
      return !!this.$slots['add-btn']
    }
  },

  watch: {
    routeSort () {
      this.reloadRoutes()
    },
    cragSectorId () {
      if (this.sectorSelectorIsFilter) {
        this.reloadRoutes(this.cragSectorId)
      }
    }
  },

  mounted () {
    this.$root.$on('searchCragRoutesResults', (results) => {
      this.haveSearchResults(results)
    })
    this.$root.$on('reloadCragRouteList', () => {
      this.reloadRoutes()
    })
    this.getRoutes()
  },

  beforeDestroy () {
    this.$root.$off('searchCragRoutesResults')
    this.$root.$off('reloadCragRouteList')
  },

  methods: {
    areaResize () {
      const area = this.$refs['crag-route-area']
      if (area) {
        if (this.areaHeight < area.offsetHeight) {
          area.style.minHeight = `${area.offsetHeight}px`
          this.areaHeight = area.offsetHeight
        }
      }
    },

    haveSearchResults (results) {
      this.routes = results
      this.disableLoadingMore = true
    },

    reloadRoutes (sectorIdFilter = null) {
      this.loadingRoutes = true
      this.disableLoadingMore = false
      this.resetLoadMorePageNumber()
      this.routes = []
      this.getRoutes(sectorIdFilter)
    },

    getRoutes (sectorIdFilter = null) {
      let promise
      if (this.crag && sectorIdFilter === null) {
        promise = new CragRouteApi(this.$axios, this.$auth).allInCrag(this.crag.id, this.page, this.routeSort)
      } else if (this.cragSector || sectorIdFilter) {
        const sectorId = this.cragSector ? this.cragSector.id : sectorIdFilter
        promise = new CragRouteApi(this.$axios, this.$auth).allInCragSector(sectorId, this.page, this.routeSort)
      }

      this.moreIsBeingLoaded()
      promise
        .then((resp) => {
          for (const route of resp.data) {
            this.routes.push(new CragRoute({ attributes: route }))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingRoutes = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-sector-or-route {
  text-align: right;
}
</style>
