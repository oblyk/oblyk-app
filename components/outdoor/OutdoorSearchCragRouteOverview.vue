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
import CommonApi from '~/services/oblyk-api/CommonApi'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'OutdoorSearchCragRouteOverview',
  components: {
    SuggestedCragRoutes,
    CragRouteSmallCard,
    CragRouteDrawer,
    OutdoorSearchField
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      cragRouteApi: null,
      cragRoutesCount: '...'
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
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
      new CommonApi(this.$axios, this.$auth)
        .microStats(['crag_routes_count'])
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
      }, 500)
    },

    apiSearch () {
      this.cragRouteApi = this.cragRouteApi || new CragRouteApi(this.$axios, this.$auth)

      this.cragRouteApi.cancelSearch()
      this.cragRouteApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const cragRoute of resp.data) {
            this.searchResults.push(new CragRoute({ attributes: cragRoute }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'cragRoute')
          }
        })
        .finally(() => {
          this.searching = false
        })
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
