<template>
  <div>
    <v-sheet class="search-overview-crag-route-container-header border-bottom pa-2">
      <outdoor-search-field
        ref="outdoorSearchField"
        search-type="cragRoute"
        :searching="searching"
        class="mx-auto"
        @input="search"
      />
    </v-sheet>

    <v-container class="outdoor-search-container" style="max-width: 600px; padding-top: 0">
      <div
        v-show="!haveQuery"
        class="mt-n1 pr-1"
      >
        <div class="text-right mb-2">
          <small
            class="text--disabled"
            v-html="$tc('components.search.count.cragRoute', cragRoutesCount, { count: cragRoutesCount.toLocaleString() })"
          />
        </div>

        <!-- SUGGESTED CRAG ROUTES -->
        <suggested-crag-routes
          v-if="$auth.loggedIn"
          :click-callback="openCragRoute"
        />
      </div>

      <!-- RESULTS -->
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <p
          v-if="resultsMeta"
          class="mt-n3 mb-2 font-weight-medium"
        >
          <small>
            {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count.toLocaleString() }) }}
          </small>
        </p>
        <div
          v-for="(cragRoute, cragRouteIndex) in searchResults"
          :key="`crag-route-outdoor-${cragRouteIndex}`"
          class="mb-1"
          @click="openCragRoute(cragRoute)"
        >
          <crag-route-small-card
            :crag-route="cragRoute"
            small
            :linkable="false"
          />
        </div>
        <loading-more
          :get-function="nextPage"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          skeleton-type="list-item-avatar"
        />
      </div>
    </v-container>
    <crag-route-drawer />
  </div>
</template>
<script>
import OutdoorSearchField from '~/components/outdoor/OutdoorSearchField'
import CragRouteDrawer from '~/components/cragRoutes/CragRouteDrawer'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import SuggestedCragRoutes from '~/components/cragRoutes/SuggestedCragRoutes'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore'

export default {
  name: 'OutdoorSearchCragRouteOverview',
  components: {
    LoadingMore,
    SuggestedCragRoutes,
    CragRouteSmallCard,
    CragRouteDrawer,
    OutdoorSearchField
  },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      resultsMeta: null,
      previousQuery: null,
      cragRouteApi: null,
      cragRoutesCount: '...'
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
    },

    cleanQuery () {
      return this.query?.trim()
    }
  },

  mounted () {
    this.getCounts()
  },

  methods: {
    giveFocus () {
      this.$refs.outdoorSearchField.giveFocus()
    },

    getCounts () {
      new OblykApi(this.$axios, this.$auth)
        .get('/micro_stats', { figures: ['crag_routes_count'] })
        .then((resp) => {
          this.cragRoutesCount = resp.data.crag_routes_count
        })
    },

    search (query) {
      this.query = query
      if (this.previousQuery === this.query) {
        this.searching = false
        return
      }

      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }
      this.searchTimeOut = setTimeout(() => {
        this.apiSearch()
      }, 300)
    },

    apiSearch (page = 1, reset = true) {
      this.moreIsBeingLoaded()
      this.oblykApi = this.oblykApi || new OblykApi(this.$axios, this.$auth)
      this.oblykApi.cancelApiRequest()
      this.oblykApi
        .get(
          '/public/crag_routes/search',
          { query: this.cleanQuery, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const cragRoute of resp.data) {
            this.searchResults.push(cragRoute)
          }
          this.previousQuery = this.query
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'crag')
          }
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.searching = false
          this.finallyMoreIsLoaded()
        })
    },

    nextPage () {
      let page = 1
      if (this.resultsMeta) {
        page = this.resultsMeta.next_page
      }
      this.apiSearch(page, false)
    },

    openCragRoute (cragRoute) {
      this.$root.$emit('getCragRouteInDrawer', cragRoute.crag_id, cragRoute.id)
    }
  }
}
</script>

<style lang="scss">
.search-overview-crag-route-container-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
@media only screen and (max-width: 959px) {
  .search-overview-crag-route-container-header {
    top: 64px;
  }
}
</style>
