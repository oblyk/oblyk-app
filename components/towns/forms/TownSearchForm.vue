<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        :md="query === null ? '9' : '12'"
      >
        <v-text-field
          ref="TownSearchForm"
          v-model="query"
          class="mt-2"
          :label="$t('components.country.france.searchPlaceHolder')"
          outlined
          clearable
          hide-details
          @keyup="search()"
          @click:clear="clearSearch()"
          @focus="scrollToElement"
        />
      </v-col>
      <v-col
        v-if="query === null"
        cols="12"
        md="3"
        align-self="center"
        class="pt-5"
      >
        <v-btn
          :loading="loadingLocalization"
          block
          large
          color="primary"
          @click="aroundMe"
        >
          <v-icon left>
            {{ mdiTarget }}
          </v-icon>
          {{ $t('actions.aroundMe') }}
        </v-btn>
      </v-col>
    </v-row>
    <div
      v-if="query !== null && searchResults.length === 0 && !searching"
      class="text-center text--disabled mt-3"
    >
      {{ $t('common.noResultFor', { query }) }}
    </div>
    <div v-if="searchResults.length > 0">
      <p class="mt-1 mb-0">
        {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count }) }}
      </p>
      <div
        v-for="(town, townIndex) in searchResults"
        :key="`town-index-${townIndex}`"
      >
        <town-card
          :town="town"
          class="mt-2"
        />
      </div>
      <loading-more
        v-if="searchMode === 'query'"
        :get-function="nextPage"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />
    </div>
  </div>
</template>

<script>
import { mdiTarget } from '@mdi/js'
import TownCard from '~/components/towns/TownCard'
import TownApi from '~/services/oblyk-api/TownApi'
import Town from '~/models/Town'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'TownSearchForm',
  components: { LoadingMore, TownCard },
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
      loadingLocalization: false,
      onSearch: false,
      searchResults: [],
      resultsMeta: null,
      previousQuery: null,
      oblykApi: null,
      searchMode: 'query',

      mdiTarget
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
      this.searchMode = 'query'
      this.oblykApi = this.oblykApi || new OblykApi(this.$axios, this.$auth)
      this.oblykApi.cancelApiRequest()
      this.oblykApi
        .get(
          '/public/towns/search',
          { query: this.cleanQuery, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const town of resp.data) {
            this.searchResults.push(town)
          }
          this.previousQuery = this.query
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'town')
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

    aroundMe () {
      this.searchMode = 'aroundMe'
      this.loadingLocalization = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            new TownApi(this.$axios, this.$auth)
              .geoSearch(
                position.coords.latitude,
                position.coords.longitude
              )
              .then((resp) => {
                this.searchResults = []
                this.resultsMeta = {
                  total_count: resp.data.length
                }
                this.onSearch = true
                for (const town of resp.data) {
                  this.searchResults.push(new Town({ attributes: town }))
                }
              })
              .finally(() => {
                this.loadingLocalization = false
              })
          },
          () => {
            this.loadingLocalization = false
          }
        )
      } else {
        this.loadingLocalization = false
      }
    },

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.TownSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
