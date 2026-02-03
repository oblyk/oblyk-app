<template>
  <div>
    <v-text-field
      ref="CragRouteSearchForm"
      v-model="query"
      :label="$t('components.cragRoute.searchRoute')"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
      @focus="scrollToElement"
    />

    <div
      v-for="cragRoute in searchResults"
      :key="cragRoute.id"
    >
      <div @click="callback ? callback(cragRoute) : null">
        <crag-route-small-card
          :crag-route="cragRoute"
          :linkable="linkableResult"
          class="mt-3"
          bordered
          small
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mdiTarget } from '@mdi/js'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'CragRouteSearchForm',
  components: { CragRouteSmallCard },
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
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      loadingLocalization: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      cragRouteApi: null,

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
          if (this.usedCallback !== null) {
            this.usedCallback(this.query)
          }
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

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.CragRouteSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
