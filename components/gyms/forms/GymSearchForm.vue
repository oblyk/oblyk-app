<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          ref="GymSearchForm"
          v-model="query"
          :label="$t(label)"
          outlined
          clearable
          hide-details
          @keyup="search()"
          @click:clear="clearSearch()"
          @focus="scrollToElement"
        />
      </v-col>
      <v-col
        v-if="aroundMeBtn"
        cols="12"
        md="6"
        lg="3"
      >
        <v-btn
          :loading="loadingLocalization"
          block
          x-large
          outlined
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

    <div v-if="searchResults.length > 0">
      <p class="mt-1 mb-0">
        {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count }) }}
      </p>
      <div
        v-for="(gym, gymIndex) in searchResults"
        :key="`gym-index-${gymIndex}`"
      >
        <gym-small-card
          :gym="gym"
          :linkable="linkableResult"
          :callback="callback"
          class="mt-3"
          :small="true"
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
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  name: 'GymSearchForm',
  components: { LoadingMore, GymSmallCard },
  mixins: [LoadingMoreHelpers],
  props: {
    linkableResult: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: null
    },
    usedCallback: {
      type: Function,
      default: null
    },
    aroundMeBtn: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'components.gym.searchGym'
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
      }, 150)
    },

    apiSearch (page = 1, reset = true) {
      this.moreIsBeingLoaded()
      this.searchMode = 'query'
      this.oblykApi = this.oblykApi || new OblykApi(this.$axios, this.$auth)
      this.oblykApi.cancelApiRequest()
      this.oblykApi
        .get(
          '/gyms/search',
          { query: this.query, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const gym of resp.data) {
            this.searchResults.push(gym)
          }
          this.previousQuery = resp.meta.query
          if (this.usedCallback !== null) {
            this.usedCallback(resp.meta.query)
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'gym')
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
      const distance = 20
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            new OblykApi(this.$axios, this.$auth)
              .get('/gyms/gyms_around', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                distance
              })
              .then((resp) => {
                this.searchResults = []
                this.resultsMeta = {
                  total_count: resp.data.length
                }
                this.onSearch = true
                for (const gym of resp.data) {
                  this.searchResults.push(gym)
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
        const element = this.$refs.GymSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
