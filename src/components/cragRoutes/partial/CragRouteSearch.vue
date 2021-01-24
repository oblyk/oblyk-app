<template>
  <v-text-field
    outlined
    prepend-inner-icon="mdi-magnify"
    @click:clear="clearSearch()"
    v-model="query"
    :loading="searching"
    hide-details
    clearable
    :label="$t('components.cragRoute.searchRoute')"
    @keyup="search()"
  />
</template>

<script>
import CragRoute from '@/models/CragRoute'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'

export default {
  name: 'CragRouteSearch',
  props: {
    value: String,
    crag: Object,
    cragSector: Object
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null
    }
  },

  watch: {
    query: function () {
      if (this.query === '') {
        this.clearSearch()
      }
    }
  },

  methods: {
    clearSearch: function () {
      this.$root.$emit('reloadCragRouteList')
    },

    search: function () {
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

    apiSearch: function () {
      CragRouteApi.cancelSearch()

      let promise
      if (this.cragSector) {
        promise = CragRouteApi.searchInSector(this.cragSector.id, this.query)
      } else {
        promise = CragRouteApi.searchInCrag(this.crag.id, this.query)
      }

      promise
        .then(resp => {
          this.searchResults = []
          for (const cragRoute of resp.data) {
            this.searchResults.push(new CragRoute(cragRoute))
          }
          this.previousQuery = this.query
          this.$root.$emit('searchCragRoutesResults', this.searchResults)
        })
        .catch(err => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'cragRoute')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
