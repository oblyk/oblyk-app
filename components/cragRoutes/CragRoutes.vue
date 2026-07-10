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
          <client-only>
            <v-col
              v-if="$auth.loggedIn"
              cols="12"
              md="6"
              class="add-sector-or-route"
            >
              <slot
                v-if="hasCustomAddedBtn"
                name="add-btn"
              />
              <add-sector-or-route-btn
                v-else
                :crag="crag"
                :crag-sector="cragSector"
              />
            </v-col>
          </client-only>
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-row class="align-center">
          <v-col
            cols="12"
            md="4"
            lg="3"
          >
            <v-btn
              text
              block
              x-large
              outlined
              @click="openSearchDialog()"
            >
              <v-icon left>
                {{ mdiMagnify }}
              </v-icon>
              {{ $t('components.cragRoute.searchRoute') }}
            </v-btn>
            <v-dialog
              v-model="searchRouteDialog"
              max-width="500"
            >
              <v-card class="pt-4">
                <crag-route-search
                  ref="cragRouteSearchInput"
                  class="px-3"
                  :crag-sector="cragSector"
                  :crag="crag"
                  :callback="cragRouteCallback"
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="searchRouteDialog = false"
                  >
                    {{ $t('actions.close') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

      <client-only>
        <v-sheet
          v-if="!$auth.loggedIn"
          class="rounded text-center pa-4 my-2 border mx-4"
        >
          <p class="mb-2" v-html="$t('components.cragRoute.mustBeLogin')" />
          <div>
            <v-btn
              elevation="0"
              color="primary"
              :to="`/sign-in?redirect_to=${$route.fullPath}&back_to=${$route.fullPath}`"
            >
              {{ $t('actions.signIn') }}
            </v-btn>
            <v-btn
              elevation="0"
              color="primary"
              :to="`/sign-up?redirect_to=${$route.fullPath}&back_to=${$route.fullPath}`"
            >
              {{ $t('actions.signUp') }}
            </v-btn>
          </div>
        </v-sheet>
      </client-only>

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
import { mdiSourceBranch, mdiMagnify } from '@mdi/js'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import CragRoute from '@/models/CragRoute'
import OblykApi from '~/services/oblyk-api/OblykApi'
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
  mixins: [LoadingMoreHelpers],

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
      searchRouteDialog: false,
      query: null,
      routeSort: 'difficulty_desc',
      loadingRoutes: true,
      routes: [],
      areaHeight: 0,
      cragSectorId: null,
      disableLoadingMore: false,

      mdiSourceBranch,
      mdiMagnify
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
        promise = new OblykApi(this.$axios, this.$auth).get(
          `/public/crags/${this.crag.id}/crag_routes`,
          { order_by: this.routeSort || 'difficulty_desc', page: this.page }
        )
      } else if (this.cragSector || sectorIdFilter) {
        const sectorId = this.cragSector ? this.cragSector.id : sectorIdFilter
        promise = new OblykApi(this.$axios, this.$auth).get(
          `/public/crag_sectors/${sectorId}/crag_routes`,
          { order_by: this.routeSort || 'difficulty_desc', page: this.page }
        )
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
    },

    openSearchDialog () {
      this.searchRouteDialog = true
      setTimeout(() => {
        this.$refs.cragRouteSearchInput.giveFocus()
      }, 150)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-sector-or-route {
  text-align: right;
}
</style>
