<template>
  <div>
    <v-text-field
      ref="cragRouteSearchInput"
      v-model="query"
      outlined
      :prepend-inner-icon="icon"
      :hide-details="hideDetail"
      :tabindex="tabindex"
      clearable
      :label="$t(labelKey)"
      @keyup="search"
      @click:clear="clearSearch"
    />
    <div v-if="searchResults.length > 0">
      <p class="mt-1 mb-0">
        {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count }) }}
      </p>
      <div
        v-for="(cragRoute, cragRouteIndex) in searchResults"
        :key="`crag-route-index-${cragRouteIndex}`"
      >
        <crag-route-list-item
          :route="cragRoute"
          :callback="callback"
          class="mt-3"
        />
      </div>
      <loading-more
        :get-function="nextPage"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />
    </div>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import OblykApi from '~/services/oblyk-api/OblykApi'
import CragRouteListItem from '~/components/cragRoutes/CragRouteListItem'

export default {
  name: 'CragRouteSearch',
  components: {
    CragRouteListItem,
    LoadingMore
  },
  mixins: [LoadingMoreHelpers],
  props: {
    value: {
      type: String,
      default: null
    },
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    },
    labelKey: {
      type: String,
      default: 'components.cragRoute.searchRoute'
    },
    icon: {
      type: String,
      default: mdiMagnify
    },
    hideDetail: {
      type: Boolean,
      default: true
    },
    eventTrigger: {
      type: String,
      default: 'searchCragRoutesResults'
    },
    linkableResult: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    },
    tabindex: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      resultsMeta: null,
      previousQuery: null,
      oblykApi: null,

      mdiMagnify
    }
  },

  computed: {
    cleanQuery () {
      return this.query?.trim()
    }
  },

  watch: {
    value () {
      this.query = this.value
    }
  },

  mounted () {
    this.$root.$on('clearRouteSearchGiveFocus', () => {
      this.giveFocus()
    })
  },

  beforeDestroy () {
    this.$root.$off('clearRouteSearchGiveFocus')
  },

  methods: {
    giveFocus () {
      this.$refs.cragRouteSearchInput.focus()
    },

    search () {
      this.$emit('input', this.query)

      if (this.previousQuery === this.query || this.query === '' || this.query === null) {
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

      let url
      if (this.cragSector) {
        url = `/public/crag_sectors/${this.cragSector.id}/crag_routes/search`
      } else if (this.crag) {
        url = `/public/crags/${this.crag.id}/crag_routes/search`
      } else {
        url = '/public/crag_routes/search'
      }
      this.oblykApi
        .get(
          url,
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
            this.$root.$emit('alertFromApiError', err, 'cragRoute')
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

    clearSearch () {
      this.searchResults = []
      this.resultsMeta = null
      this.previousQuery = null
      this.query = null
    }
  }
}
</script>
