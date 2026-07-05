<template>
  <div>
    <v-text-field
      ref="AreaSearchForm"
      v-model="query"
      :label="$t('components.area.searchArea')"
      outlined
      clearable
      hide-details
      @keyup="search()"
      @click:clear="clearSearch()"
      @focus="scrollToElement"
    />

    <div v-if="searchResults.length > 0">
      <p class="mt-1 mb-0">
        {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count }) }}
      </p>
      <div
        v-for="area in searchResults"
        :key="area.id"
      >
        <div @click="callback ? callback(area) : null">
          <area-small-card
            :area="area"
            :linkable="linkableResult"
            class="mt-3"
          />
        </div>
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
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import AreaSmallCard from '@/components/areas/AreaSmallCard'
import LoadingMore from '~/components/layouts/LoadingMore'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'AreaSearchForm',
  components: { LoadingMore, AreaSmallCard },
  mixins: [LoadingMoreHelpers],
  props: {
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },

    callback: {
      type: Function,
      required: false,
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
      oblykApi: null
    }
  },

  computed: {
    cleanQuery () {
      return this.query?.trim()
    }
  },

  methods: {
    search () {
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
          '/public/areas/search',
          { query: this.cleanQuery, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const area of resp.data) {
            this.searchResults.push(area)
          }
          this.previousQuery = this.query
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'area')
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
    },

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.AreaSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
