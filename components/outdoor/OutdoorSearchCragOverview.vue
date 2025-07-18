<template>
  <div>
    <v-sheet class="search-overview-crag-container-header border-bottom pa-2">
      <outdoor-search-field
        ref="outdoorSearchField"
        search-type="crag"
        :searching="searching"
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
        <div class="d-flex mb-4">
          <v-card
            to="/maps/crags?back_to=/outdoor/search/crags"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/crags-map.jpg"
              alt="Carte des falaise"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiMap }}
                </v-icon>
                {{ $t('components.search.map.crag') }}
              </p>
            </v-img>
          </v-card>
          <v-card
            to="/crags/search?back_to=/outdoor/search/crags"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/advanced-search.jpg"
              alt="Recherche avancée"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiMagnifyExpand }}
                </v-icon>
                {{ $t('common.pages.find.crags.advancedSearch.title') }}
              </p>
            </v-img>
          </v-card>
        </div>

        <!-- CRAGS BY POPULARITY -->
        <crags-by-popularity />
      </div>

      <!-- RESULTS -->
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <crag-cover-card
          v-for="(crag, cragIndex) in searchResults"
          :key="`crag-outdoor-${cragIndex}`"
          :crag="crag"
          class="mb-1"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import { mdiMagnifyExpand, mdiMap, mdiMapSearch } from '@mdi/js'
import OutdoorSearchField from '~/components/outdoor/OutdoorSearchField'
import CragCoverCard from '~/components/crags/CragCoverCard'
import CragsByPopularity from '~/components/crags/CragsByPopularity'
import CommonApi from '~/services/oblyk-api/CommonApi'
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '~/models/Crag'

export default {
  name: 'OutdoorSearchCragOverview',
  components: {
    CragsByPopularity,
    CragCoverCard,
    OutdoorSearchField
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      cragApi: null,
      cragsCount: '...',

      mdiMap,
      mdiMapSearch,
      mdiMagnifyExpand
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
        .microStats(['crags_count'])
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
      }, 500)
    },

    apiSearch () {
      this.cragApi = this.cragApi || new CragApi(this.$axios, this.$auth)

      this.cragApi.cancelSearch()
      this.cragApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const crag of resp.data) {
            this.searchResults.push(new Crag({ attributes: crag }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'crag')
          }
        })
        .finally(() => {
          this.searching = false
        })
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
