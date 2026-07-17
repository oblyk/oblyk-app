<template>
  <div>
    <v-sheet class="search-overview-crag-container-header border-bottom pa-2">
      <outdoor-search-field
        ref="outdoorSearchField"
        search-type="crag"
        class="mx-auto"
        @input="search"
      />
    </v-sheet>
    <v-container class="outdoor-search-container pt-0" style="max-width: 600px; padding-top: 0">
      <div
        v-show="!haveQuery"
        class="mt-n1 pr-1"
      >
        <div class="text-right">
          <small
            class="text--disabled"
            v-html="$tc('components.search.count.crag', cragsCount, { count: cragsCount.toLocaleString() })"
          />
        </div>

        <!-- FIND IN ANOTHER WAY -->
        <p class="mb-1 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiMapSearch }}
          </v-icon>
          {{ $t('common.findAnotherWay') }}
        </p>
        <v-row class="v-row-gutters-12 mb-4">
          <v-col cols="6" md="4">
            <v-card to="/maps/crags?back_to=/outdoor/search/crags">
              <v-img
                src="/images/crags-map.jpg"
                alt="Carte des falaise"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('components.search.map.crag') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card to="/crags/search?back_to=/outdoor/search/crags">
              <v-img
                src="/images/advanced-search.jpg"
                alt="Recherche avancée"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('common.pages.find.crags.advancedSearch.title') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
        </v-row>

        <!-- CRAGS BY POPULARITY -->
        <crags-by-popularity />
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
        <crag-cover-card
          v-for="(crag, cragIndex) in searchResults"
          :key="`crag-outdoor-${cragIndex}`"
          :crag="crag"
          class="mb-1"
        />
        <loading-more
          :get-function="nextPage"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          skeleton-type="list-item-avatar"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import { mdiMap, mdiMapSearch } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OutdoorSearchField from '~/components/outdoor/OutdoorSearchField'
import CragCoverCard from '~/components/crags/CragCoverCard'
import CragsByPopularity from '~/components/crags/CragsByPopularity'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore'

export default {
  name: 'OutdoorSearchCragOverview',
  components: {
    LoadingMore,
    CragsByPopularity,
    CragCoverCard,
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
      cragApi: null,
      cragsCount: '...',

      mdiMap,
      mdiMapSearch
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
        .get('/micro_stats', { figures: ['crags_count'] })
        .then((resp) => {
          this.cragsCount = resp.data.crags_count
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
          '/public/crags/search',
          { query: this.cleanQuery, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const crag of resp.data) {
            this.searchResults.push(crag)
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
    }
  }
}
</script>

<style lang="scss">
.search-overview-crag-container-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
@media only screen and (max-width: 959px) {
  .search-overview-crag-container-header {
    top: 64px;
  }
}
</style>
